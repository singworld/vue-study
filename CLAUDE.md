# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Vue3 learning repository containing educational materials and examples for mastering Vue3's Composition API. The primary focus is on practical learning through hands-on examples and progressive skill building.

## Development Environment

- **Package Manager**: pnpm (as specified by user preference)
- **Framework**: Vue 3 with Composition API
- **Learning Approach**: Progressive from basic concepts to advanced patterns

## Common Commands

When creating Vue3 projects for learning exercises:
```bash
# Create new Vue3 project (user prefers pnpm)
pnpm create vue@latest [project-name]

# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Run linter (when available)
pnpm lint

# Run tests (when available)
pnpm test
```

## Learning Structure

The learning materials are organized to cover Vue3 Composition API concepts in this order:
1. Basic Composition API concepts and advantages
2. Project setup and structure familiarity
3. `<script setup>` syntax sugar
4. `reactive` vs `ref` usage patterns
5. `computed` properties implementation
6. `watch` and `watchEffect` usage
7. Composition API lifecycle hooks
8. Parent-child component communication
9. Template refs and `defineExpose`
10. `provide`/`inject` for cross-layer communication

## Architecture Notes

When creating learning examples, follow these patterns:
- Use `<script setup>` syntax as the primary approach
- Prefer `ref()` for reactive data to reduce cognitive load
- Create focused, single-concept examples
- Build progressively from simple to complex use cases
- Include both basic usage and common gotchas for each concept

## Development Philosophy

- Incremental learning over comprehensive examples
- Code clarity over cleverness
- Hands-on practice with each concept before moving to the next
- Focus on understanding WHY each pattern exists, not just HOW to use it