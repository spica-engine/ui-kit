#!/usr/bin/perl
use strict;
use warnings;

while (<>) {
  # Colors: primary
  s/var\(--oziko-color-primary-light-rgb\)/var(--color-accent-hover-rgb)/g;
  s/var\(--oziko-color-primary-dark-rgb\)/var(--color-accent-dark-rgb)/g;
  s/var\(--oziko-color-primary-light\)/var(--color-accent-hover)/g;
  s/var\(--oziko-color-primary-dark\)/var(--color-accent-dark)/g;
  s/var\(--oziko-color-primary-rgb\)/var(--color-accent-rgb)/g;
  s/var\(--oziko-color-primary\)/var(--color-accent)/g;

  # Colors: danger
  s/var\(--oziko-color-danger-light-rgb\)/var(--color-red-light-rgb)/g;
  s/var\(--oziko-color-danger-dark-rgb\)/var(--color-red-rgb)/g;
  s/var\(--oziko-color-danger-light\)/var(--color-red-light)/g;
  s/var\(--oziko-color-danger-dark\)/var(--color-red)/g;
  s/var\(--oziko-color-danger-rgb\)/var(--color-red-rgb)/g;
  s/var\(--oziko-color-danger\)/var(--color-red)/g;

  # Colors: success
  s/var\(--oziko-color-success-light-rgb\)/var(--color-green-light-rgb)/g;
  s/var\(--oziko-color-success-dark-rgb\)/var(--color-green-rgb)/g;
  s/var\(--oziko-color-success-light\)/var(--color-green-light)/g;
  s/var\(--oziko-color-success-dark\)/var(--color-green)/g;
  s/var\(--oziko-color-success-rgb\)/var(--color-green-rgb)/g;
  s/var\(--oziko-color-success\)/var(--color-green)/g;

  # Colors: soft
  s/var\(--oziko-color-soft-hover\)/var(--color-surface-2)/g;
  s/var\(--oziko-color-soft-dark-rgb\)/var(--color-border-mid-rgb)/g;
  s/var\(--oziko-color-soft-dark\)/var(--color-border-mid)/g;
  s/var\(--oziko-color-soft-light-rgb\)/var(--color-surface-rgb)/g;
  s/var\(--oziko-color-soft-light\)/var(--color-surface)/g;
  s/var\(--oziko-color-soft-rgb\)/var(--color-surface-3-rgb)/g;
  s/var\(--oziko-color-soft\)/var(--color-surface-3)/g;

  # Colors: default
  s/var\(--oziko-color-default-rgb\)/var(--color-surface-rgb)/g;
  s/var\(--oziko-color-default\)/var(--color-surface)/g;
  s/var\(--oziko-color-transparent\)/transparent/g;

  # Colors: input
  s/var\(--oziko-color-input-background-rgb\)/var(--color-surface-2-rgb)/g;
  s/var\(--oziko-color-input-background\)/var(--color-surface-2)/g;
  s/var\(--oziko-color-input-placeholder-rgb\)/var(--color-text-muted-rgb)/g;
  s/var\(--oziko-color-input-placeholder\)/var(--color-text-muted)/g;

  # Colors: font
  s/var\(--oziko-color-font-primary-rgb\)/var(--color-text-primary-rgb)/g;
  s/var\(--oziko-color-font-primary\)/var(--color-text-primary)/g;
  s/var\(--oziko-color-font-secondary-rgb\)/var(--color-on-accent-rgb)/g;
  s/var\(--oziko-color-font-secondary\)/var(--color-on-accent)/g;

  # Colors: border, backgrounds
  s/var\(--oziko-color-border-rgb\)/var(--color-border-rgb)/g;
  s/var\(--oziko-color-border\)/var(--color-border)/g;
  s/var\(--oziko-color-zebra-rgb\)/var(--color-surface-2-rgb)/g;
  s/var\(--oziko-color-zebra\)/var(--color-surface-2)/g;
  s/var\(--oziko-color-background-secondary\)/var(--color-surface-3)/g;
  s/var\(--oziko-color-background-rgb\)/var(--color-bg-rgb)/g;
  s/var\(--oziko-color-background\)/var(--color-bg)/g;
  s/var\(--oziko-color-menu-background-rgb\)/var(--color-surface-rgb)/g;
  s/var\(--oziko-color-menu-background\)/var(--color-surface)/g;
  s/var\(--oziko-color-box-shadow\)/var(--color-overlay)/g;

  # Border shorthand and shadow
  s/var\(--oziko-border-default\)/var(--border-default)/g;
  s/var\(--box-shadow\)/var(--shadow-md)/g;

  # Border radius
  s/var\(--oziko-border-radius-circle\)/var(--radius-full)/g;
  s/var\(--oziko-border-radius-round\)/var(--radius-full)/g;
  s/var\(--oziko-border-radius-lg\)/var(--radius-2xl)/g;
  s/var\(--oziko-border-radius-md\)/var(--radius-md)/g;
  s/var\(--oziko-border-radius-sm\)/var(--radius-sm)/g;

  # Spacing
  s/var\(--oziko-padding-xl\)/var(--spacing-14)/g;
  s/var\(--oziko-padding-lg\)/var(--spacing-12)/g;
  s/var\(--oziko-padding-md\)/var(--spacing-9)/g;
  s/var\(--oziko-padding-sm\)/var(--spacing-4)/g;
  s/var\(--oziko-padding-xs\)/var(--spacing-2)/g;
  s/var\(--oziko-gap-xl\)/var(--spacing-14)/g;
  s/var\(--oziko-gap-lg\)/var(--spacing-12)/g;
  s/var\(--oziko-gap-md\)/var(--spacing-9)/g;
  s/var\(--oziko-gap-sm\)/var(--spacing-4)/g;
  s/var\(--oziko-gap-xs\)/var(--spacing-2)/g;

  # Typography
  s/var\(--oziko-font-size-xl\)/var(--font-size-xl)/g;
  s/var\(--oziko-font-size-lg\)/var(--font-size-lg)/g;
  s/var\(--oziko-font-size-md\)/var(--font-size-lg)/g;
  s/var\(--oziko-font-size-sm\)/var(--font-size-base)/g;
  s/var\(--oziko-font-size-xs\)/var(--font-size-xs)/g;
  s/var\(--oziko-font-family-base\)/var(--font-sans)/g;

  # Icon sizes
  s/var\(--oziko-icon-size-lg\)/var(--size-icon-lg)/g;
  s/var\(--oziko-icon-size-md\)/var(--size-icon-md)/g;
  s/var\(--oziko-icon-size-sm\)/var(--size-icon-sm)/g;
  s/var\(--oziko-icon-size-xs\)/var(--size-icon-xs)/g;

  # Transitions and utility
  s/var\(--oziko-transition-duration\)/var(--transition-base)/g;
  s/var\(--oziko-disabled-opacity\)/var(--opacity-disabled)/g;

  print;
}
