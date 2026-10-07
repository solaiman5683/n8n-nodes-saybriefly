# n8n-nodes-saybriefly

This is an n8n community node for [SayBriefly](https://saybriefly.com). It lets you use your SayBriefly
meeting recaps and to-dos in n8n workflows, and add to-dos to SayBriefly from any workflow.

SayBriefly helps freelancers and studios deliver what was agreed and stop scope creep: an AI notetaker
that records calls on Mac or Windows with no bot joining, project briefs, and one to-do list.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Compatibility](#compatibility) · [Usage](#usage) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the
n8n community nodes documentation. The package name is `n8n-nodes-saybriefly`.

## Operations

**Meeting**
- **Get Many**: recorded meetings that have a finished recap, newest first. Each item has the title,
  start and end time, platform, duration, summary, key decisions, action items, participants and what
  changed since the last call.

**To-Do**
- **Get Many**: to-dos from your SayBriefly To-Do list, newest first. Filter by status (all, open, done).
- **Create**: add a to-do with a title and, optionally, a due date, priority, notes and project name.

The node can also be used as a tool by n8n AI agents.

## Credentials

You need a SayBriefly account (Solo or Studio plan, or the 14-day trial).

1. In SayBriefly, open **Settings → Integrations → Connect your AI** and create a key. It starts with `sbk_`.
2. In n8n, create a **SayBriefly API** credential and paste the key.

The key reads and writes only your own data in your workspace. Remove it in SayBriefly at any time to
revoke access.

## Compatibility

Built and tested with n8n 1.x (`n8nNodesApiVersion` 1). No runtime dependencies.

## Usage

Examples:
- Every morning, get open to-dos and post them to Slack.
- Every hour, get new meeting recaps and add a row to Google Sheets or a page to Notion.
- When a form is submitted or a card moves in your project tool, create a SayBriefly to-do.

To act only on new meeting recaps, store the last seen meeting `id` (for example with the Remove
Duplicates node) and keep the newer items.

## Resources

- [SayBriefly](https://saybriefly.com)
- [SayBriefly REST API documentation](https://github.com/solaiman5683/saybriefly-mcp/blob/main/API.md)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- Support: inbox@saybriefly.com
