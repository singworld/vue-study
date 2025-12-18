import feedparser
import psycopg2
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import time
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# 禁用 InsecureRequestWarning 的警告信息1
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# 数据库连接配置
db_config = {
    'dbname': 'xyz1024',
    'user': 'rebound',
    'password': 'Rebound@123',
    'host': '1.15.134.199',
    'port': '5432'
}

cookie_str = 'wordpress_b1bc5d7e746ed0a95f813e97c152eb78=mail_28157101%7C1764136472%7CYvrGjwIwPd9qMWiWY25i2MbGZVRfcI0wXj3LT9odxbN%7Ca4110ecce71a091be43f6d7f4ce9f43cb23611822d86c736a5d8c64064d4eaa8; wordpress_sec_b1bc5d7e746ed0a95f813e97c152eb78=mail_28157101%7C1764136472%7CmUkEfVzuSnSlKxeitD11qy2kPZucAj3sdjDe7EQdb2F%7C65d106c915bb7367bcf41f8edc1bcb1cc2fe7ff10b7aa094d8c2569bc05a153a; PHPSESSID=lkj5g84ie9leulan12hp4l87d9; wordpress_logged_in_b1bc5d7e746ed0a95f813e97c152eb78=mail_28157101%7C1764136472%7CmUkEfVzuSnSlKxeitD11qy2kPZucAj3sdjDe7EQdb2F%7Cb8eda6a188286a58e8cece4925196e5576de9fcb76267c5226841a1458d63742'

# 获取数据库连接
def get_db_connection():
    return psycopg2.connect(**db_config)

# 插入新RSS条目
def insert_rss_item(title, link, pub_date):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO table_name_test (name, page_url, pub_date, status)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (page_url) DO NOTHING;  -- 遇到重复链接则跳过
        """, (title, link, pub_date, 0))
        conn.commit()
    except Exception as e:
        print(f"Error inserting item: {e}")
    finally:
        cursor.close()
        conn.close()

# 从RSS源获取新内容并插入数据库
def fetch_and_insert_rss(feed_url):
    feed = feedparser.parse(feed_url)
    for entry in feed.entries:
        title = entry.title
        link = entry.link
        pub_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z')
        insert_rss_item(title, link, pub_date)

# 获取未处理的文章链接（status = 0）
def fetch_page_urls(limit=10):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, page_url
        FROM table_name_test
        WHERE status = 0
        ORDER BY id DESC
        LIMIT %s;
    """, (limit,))
    urls = cursor.fetchall()
    cursor.close()
    conn.close()
    return urls

# 更新数据库记录（支持百度网盘和夸克网盘）
def update_db_record(id, pan_url=None, qk_url=None, status=1):
    conn = get_db_connection()
    cursor = conn.cursor()

    # 构建动态SQL，只更新提供的字段
    update_fields = []
    params = []

    if pan_url is not None:
        update_fields.append("pan_url = %s")
        params.append(pan_url)

    if qk_url is not None:
        update_fields.append("qk_url = %s")
        params.append(qk_url)

    update_fields.append("status = %s")
    params.append(status)
    params.append(id)

    sql = f"""
        UPDATE table_name_test
        SET {', '.join(update_fields)}
        WHERE id = %s;
    """

    cursor.execute(sql, tuple(params))
    conn.commit()
    cursor.close()
    conn.close()

# 标记404页面为跳过状态
def mark_as_404(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE table_name_test
        SET status = -1
        WHERE id = %s;
    """, (id,))
    conn.commit()
    cursor.close()
    conn.close()

# 获取最终网盘链接
def get_final_url(page_url, headers, timeout=5000, max_retries=3):
    try:
        response = requests.get(page_url, headers=headers, timeout=timeout, verify=False)
        
        # 检查状态码
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            main_content = soup.find('main', id='main', role='main', class_='site-content')
            
            # 查找主内容
            if main_content:
                # 查找密码按钮，获取密码
                password = None
                password_button = main_content.find('button', {'data-clipboard-text': True})
                if password_button:
                    password = password_button.get('data-clipboard-text')
                    print(f"找到密码: {password}")
                
                links = main_content.find_all('a', href=True)
                
                # 遍历找到"立即下载"的链接
                for link in links:
                    if '立即下载' in link.text:
                        download_url = link['href']
                        time.sleep(30)
                        
                        # 尝试多次重试获取最终链接
                        for attempt in range(max_retries):
                            try:
                                response = requests.get(download_url, headers=headers, allow_redirects=True, timeout=timeout, verify=False)
                                
                                # 如果返回的URL包含 "pan.baidu.com"，则返回这个URL
                                response.close()  # 关闭连接
                                if "pan" in response.url:
                                    final_url = response.url
                                    # 如果URL不包含&pwd=且找到了密码，则拼接密码
                                    if password and '&pwd=' not in final_url:
                                        final_url = f"{final_url}&pwd={password}"
                                        print(f"拼接密码后的最终URL: {final_url}")
                                    return final_url
                                break  # 成功时退出重试循环
                            except requests.RequestException as re:
                                if attempt < max_retries - 1:
                                    time.sleep(2)  # 等待后重试
                                else:
                                    print(f"Failed after {max_retries} retries: {re}")
        else:
            print(f"Failed to fetch page. Status code: {response.status_code}")
        return None
    except requests.exceptions.SSLError as ssl_err:
        print(f"SSL Error fetching URL: {ssl_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout Error fetching URL: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request Error fetching URL: {req_err}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    return None

# 新方式：直接从页面HTML提取网盘链接
def extract_pan_links_from_html(page_url, headers, timeout=10):
    """
    从页面HTML中直接提取百度网盘和夸克网盘链接
    返回: (baidu_url, quark_url) 元组，找不到则为None
    """
    try:
        response = requests.get(page_url, headers=headers, timeout=timeout, verify=False)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            main_content = soup.find('main', id='main', role='main', class_='site-content')

            if main_content:
                baidu_url = None
                quark_url = None

                # 直接查找所有包含网盘域名的链接
                all_links = main_content.find_all('a', href=True)

                for link in all_links:
                    href = link.get('href', '')

                    # 检查是否是百度网盘链接
                    if 'pan.baidu.com' in href and not baidu_url:
                        baidu_url = href
                        print(f"找到百度网盘链接: {baidu_url}")

                    # 检查是否是夸克网盘链接
                    if 'pan.quark.cn' in href and not quark_url:
                        quark_url = href
                        print(f"找到夸克网盘链接: {quark_url}")

                    # 如果两个都找到了，就可以退出循环
                    if baidu_url and quark_url:
                        break

                return (baidu_url, quark_url)
        else:
            print(f"Failed to fetch page. Status code: {response.status_code}")
            return (None, None)

    except requests.exceptions.SSLError as ssl_err:
        print(f"SSL Error fetching URL: {ssl_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout Error fetching URL: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request Error fetching URL: {req_err}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    return (None, None)

# 主函数
def main():
    # 1. 获取RSS内容并插入数据库
    feed_url = "https://www.1024zyz.com/feed"
    fetch_and_insert_rss(feed_url)
    print("RSS数据已更新。")

    # 2. 从数据库获取未处理的文章链接，获取网盘链接并更新数据库
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Cookie': cookie_str
    }

    success_count = 0
    target_success = 10
    batch_size = 10
    max_total_attempts = 20  # 最多尝试处理50个URL，防止无限循环
    total_attempts = 0

    while success_count < target_success and total_attempts < max_total_attempts:
        print(f"\n当前成功处理数量: {success_count}/{target_success}")
        print(f"获取下一批 {batch_size} 个待处理URL...")

        urls = fetch_page_urls(batch_size)

        if not urls:
            print("没有更多待处理的URL了。")
            break

        for id, page_url in urls:
            total_attempts += 1
            print(f"Processing page URL: {page_url} (总尝试次数: {total_attempts}/{max_total_attempts})")

            # 先尝试新方式：直接从HTML提取网盘链接
            baidu_url, quark_url = extract_pan_links_from_html(page_url, headers)

            if baidu_url or quark_url:
                # 新方式成功提取到链接
                print(f"新方式提取成功 - 百度网盘: {baidu_url}, 夸克网盘: {quark_url}")
                update_db_record(id, pan_url=baidu_url, qk_url=quark_url, status=1)
                print(f"Updated database with new method")
                # 注意：新方式不累计到success_count
            else:
                # 新方式失败，尝试旧方式
                print(f"新方式未提取到链接，尝试旧方式（立即下载按钮）...")
                final_url = get_final_url(page_url, headers)
                if final_url:
                    update_db_record(id, pan_url=final_url, status=1)
                    print(f"Updated database with final URL: {final_url}")
                    success_count += 1
                    print(f"累计成功处理 {success_count} 条")

                    if success_count >= target_success:
                        print(f"已达到目标成功处理数量 {target_success} 条，停止处理。")
                        break
                else:
                    # 检查是否是404错误
                    try:
                        response = requests.head(page_url, headers=headers, timeout=10, verify=False)
                        if response.status_code == 404:
                            print(f"页面404，跳过处理: {page_url}")
                            mark_as_404(id)
                        else:
                            print(f"No download link found for: {page_url}")
                            # 不更新数据库，保持status=0，下次继续处理
                    except:
                        print(f"无法检查页面状态，保持原状态: {page_url}")
                        # 不更新数据库，保持status=0，下次继续处理

            time.sleep(30)

        if success_count < target_success and not urls:
            print("已处理完所有可用URL但未达到目标数量。")
            break

        # 检查是否达到最大尝试次数
        if total_attempts >= max_total_attempts:
            print(f"已达到最大尝试次数 {max_total_attempts} 次，停止处理。")
            break

    print(f"\n处理完成！总共尝试了 {total_attempts} 次，成功处理了 {success_count} 条记录。")

if __name__ == "__main__":
    main()
