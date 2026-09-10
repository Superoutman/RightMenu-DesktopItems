# Changelog

## Unreleased

### Changed

- Added a repeatable Release packaging command that emits both versioned and
  stable-name ZIP assets for permanent download links.
- Documented the two-asset GitHub Release and post-publish verification flow.

## 1.0.2 — 2026-09-09

### Changed

- Restored the original pre-separation feature description, which explains
  where the Hide or Show Desktop Items command appears.

## 1.0.1 — 2026-09-09

### Added

- Added a localized one-sentence feature description for the shared RightMenu
  plugin detail template.

## 1.0.0 — 2026-09-09

### Added

- Added the independently installable Desktop Items container action.
- Added localized menu titles and permission explanations for seven languages.
- Added state-aware titles: Hide Desktop Items while files are visible and
  Show Desktop Items after hiding.
- Delegated all file visibility changes to RightMenu API v1.3's bounded,
  reversible `desktopItems.toggleVisibility` capability.
