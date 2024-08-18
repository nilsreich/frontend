import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from 'remark-toc';
import mdx from "@astrojs/mdx";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), react({
    include: ['**/react/*'],
    experimentalReactChildren: true
  }), mdx()],
  markdown: {    gfm: true,

    remarkPlugins: [remarkMath, [remarkToc, {
      heading: 'Themen', maxDepth: 2, tight: true,
    }]],
    rehypePlugins: [rehypeKatex,rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]
  }
});