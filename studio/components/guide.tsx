const Guide = () => (
  <>
    <h1>GUIDE</h1>
    <h3>Site Links</h3>
    <ul>
      <li>Main Preview Link: https://spur-us.vercel.app/</li>
      <li>
        Dev Preview Link: https://spur-us-git-develop-spur-us.vercel.app/
        (usually more up-to-date with latest changes than Main)
      </li>
      <li>Dev Sanity Studio Link: https://spur-dev.sanity.studio/</li>
    </ul>
    <h3>Sanity Links</h3>
    <ul>
      <li>
        <a href="https://www.sanity.io/docs">Sanity Documentation</a> - Official
        Sanity documentation
      </li>
      <li>
        <a href="https://www.sanity.io/studio">Sanity Studio</a> - Studio
        interface guide
      </li>
      <li>
        <a href="https://www.sanity.io/docs/groq">GROQ Query Language</a> - GROQ
        query reference
      </li>
      <li>
        <a href="https://www.sanity.io/docs/the-vision-plugin">
          Sanity Vision Plugin
        </a>
        - Query testing tool
      </li>
      <li>
        <a href="https://www.sanity.io/community">Sanity Community</a> -
        Community forums and support
      </li>
    </ul>
    <h3>Sanity Guides</h3>
    <ul>
      <li>
        <a href="https://www.sanity.io/docs/getting-started">
          Getting Started with Sanity
        </a>
        - Beginner's guide
      </li>
      <li>
        <a href="https://www.sanity.io/docs/schema-types">Schema Types</a> -
        Schema reference
      </li>
      <li>
        <a href="https://www.sanity.io/docs/portable-text">Portable Text</a> -
        Rich text editing
      </li>
      <li>
        <a href="https://www.sanity.io/docs/customizing-the-studio">
          Customizing the Studio
        </a>
        - Studio customization
      </li>
      <li>
        <a href="https://www.sanity.io/docs/deploying">Deploying Sanity</a> -
        Deployment guide
      </li>
    </ul>
    <h3>Helpful tools</h3>
    <ul>
      <li>
        <a href="https://it-tools.tech/">Developer Functions</a> - Developer
        toolkit
      </li>
      <li>
        <a href="https://squoosh.app/">Image Compression</a> - Image
        optimization
      </li>
      <li>
        <a href="https://www.photopea.com/">Image Editor</a> - Online Photoshop
        alternative
      </li>
      <li>
        <a href="https://silvia-odwyer.github.io/photon/demo.html">
          Image Filters
        </a>
        - Image processing
      </li>
      <li>
        <a href="https://huggingface.co/spaces/merterbak/DeepSeek-OCR-Demo/">
          Image to Text (AI, DeepSeek)
        </a>
        - Optical character recognition tool using AI (DeepSeek)
      </li>
      <li>
        <a href="https://llamaocr.com/">Image to Text</a> - Optical character
        recognition tool
      </li>
      <li>
        <a href="https://search.google.com/test/rich-results/">
          JSON-LD Tester
        </a>{" "}
        - JSON-LD Tester
      </li>
      <li>
        <a href="https://metatags.io/">Meta Tags Toolkit</a> - Meta tag
        generator
      </li>
      <li>
        <a href="https://imageoptim.com/online">More Image Compression</a> -
        Additional image compression
      </li>
      <li>
        <a href="https://en.rakko.tools/tools/9/">
          Open Graph Debugger/Simulator
        </a>
        - Social media preview
      </li>
      <li>
        <a href="https://qrframe.kylezhe.ng/">QR Code Generator</a> - QR code
        creation
      </li>
      <li>
        <a href="https://tools.rotato.app/compress">Video Compressor</a> - Video
        compression
      </li>
      <li>
        <a href="https://www.remotion.dev/convert">
          Video Converter (webm, mp4, etc)
        </a>
        - Video format conversion
      </li>
    </ul>
    <h3>Your Site Content</h3>
    <p>
      <strong>Guide Navigation Tip</strong>: This guide is fully searchable
      using your browser's search function (&lt;kbd&gt;Command+F&lt;/kbd&gt; on
      Mac, &lt;kbd&gt;Ctrl+F&lt;/kbd&gt; on Windows). Use this to quickly find
      specific information about blocks, features, or workflows.
    </p>
    <h3>Comprehensive Content Management Guide</h3>
    <p>
      This guide provides an overview of the Sanity CMS for the Spur website
      project, detailing how to navigate the studio, build pages, and manage
      content efficiently.
    </p>
    <h2>Getting Started: The Sanity Studio</h2>
    <p>
      When you first log into the studio, you will primarily interact with two
      main areas: <strong>Structure</strong> and <strong>Media</strong>.
    </p>
    <ul>
      <li>
        <strong>Structure</strong>: This is where you manage the site's
        hierarchy and page content.
      </li>
      <li>
        <strong>Media</strong>: This is the central repository for all website
        assets.
      </li>
      <li>
        <strong>Uploading Assets</strong>: You can add new images or files using
        the upload button located in the top right of the Media tab
      </li>
    </ul>
    <h2>Understanding the Sidebar Categories</h2>
    <p>The sidebar organizes the website into distinct functional areas:</p>
    <ul>
      <li>
        <strong>Content</strong>: Contains the main customer-facing pages, such
        as the homepage, careers, and pricing.
      </li>
      <li>
        <strong>Folders and Child Pages</strong>: Sections like "Platform" and
        "Solutions" use folders to indicate they contain child pages (e.g.,{" "}
        <code>/solutions/kyc</code>).
      </li>
      <li>
        <strong>Resources</strong>: This section houses the blog, case studies,
        events, and other resource articles.
      </li>
      <li>
        <strong>References</strong>: These are global documents, such as author
        profiles or staff lists, that are defined once and then referenced in
        modules across the site.
      </li>
      <li>
        <strong>Global</strong>: Use this to manage sitewide elements like the
        navigation menu and footer links.
      </li>
      <li>
        <strong>Administration</strong>: Contains organization-level
        information, primarily used for SEO and schema metadata.
      </li>
    </ul>
    <h2>Building and Editing Pages</h2>
    <p>
      The CMS uses a <strong>Module Builder</strong> system, which allows you to
      build pages by stacking blocks on top of one another.
    </p>
    <h3>Key Page Fields</h3>
    <ul>
      <li>
        <strong>Document Title</strong>: Used for internal organization within
        the CMS.
      </li>
      <li>
        <strong>Hero Module Title</strong>: This is where the actual title
        displayed on the live website is entered.
      </li>
      <li>
        <strong>Slug</strong>: This defines the URL route (e.g.,
        <code>/solutions/placeholder</code>). You can manually type a slug or
        click
        <strong>Generate</strong> to create one based on the internal title.
      </li>
    </ul>
    <h3>Working with Modules</h3>
    <ul>
      <li>
        <strong>Adding Items</strong>: Click the "plus" sign or "add items" at
        the bottom of the module builder.
      </li>
      <li>
        <strong>Grid vs. List View</strong>: You can switch between a
        <strong>List View</strong> for compact editing and a
        <strong>Grid View</strong> to see visual previews of what each module
        looks like before adding it.
      </li>
      <li>
        <strong>Rearranging</strong>: Use the drag handle on the left of each
        module to change its order on the page.
      </li>
      <li>
        <strong>Status Indicators</strong>: Look for the small status icons to
        see if a module is "Published" (green) or has "Unpublished Changes"
        (yellow).
      </li>
      <li>
        <strong>Duplicating</strong>: You can duplicate an entire page or
        individual modules to quickly replicate complex layouts.
      </li>
    </ul>
    <h3>Formatting and Links</h3>
    <p>
      The studio provides tools for rich text and visual styling within specific
      modules.
    </p>
    <ul>
      <li>
        <strong>Cross-Linking</strong>: To add a link, highlight the desired
        text and click the <strong>anchor chain icon</strong>.
      </li>
      <li>
        <strong>Internal vs. External</strong>:
        <ul>
          <li>
            <strong>Internal Links</strong>: Search for the page title directly
            in the link tool.
          </li>
          <li>
            <strong>External Links</strong>: Paste the full URL. Use the "Open
            in new tab" toggle for external sites.
          </li>
        </ul>
      </li>
      <li>
        <strong>Highlighted Text</strong>: Many modules support a
        <strong>Highlight</strong> feature in the text editor. This applies your
        brand colors to specific words for extra emphasis.
      </li>
      <li>
        <strong>Forms</strong>: For modules that support forms (like CTAs),
        input the <strong>Marketo Form ID</strong> provided by the marketing
        team.
      </li>
    </ul>
    <h3>Metadata &amp; SEO</h3>
    <p>
      Every page has a <strong>Metadata &amp; SEO</strong> tab (usually located
      in the "Settings" or "SEO" group).
    </p>
    <ul>
      <li>
        <strong>SEO Title &amp; Description</strong>: These control how your
        page appears in Google search results. Keep titles under 60 characters
        and descriptions under 160.
      </li>
      <li>
        <strong>No Index</strong>: Check this box if you want to prevent a page
        from appearing in search engines (e.g., thank-you pages or internal
        drafts).
      </li>
      <li>
        <strong>Social Image</strong>: Upload a specific image (1200x630px
        recommended) to control what shows up when the page is shared on
        LinkedIn or X (Twitter).
      </li>
    </ul>
    <h3>Slug Management</h3>
    <ul>
      <li>
        <strong>Generating Slugs</strong>: Click <strong>Generate</strong> next
        to the slug field to create a URL based on your title.
      </li>
      <li>
        <strong>URL Safety</strong>: Slugs should be lowercase and use hyphens
        instead of spaces (e.g., <code>/solutions/real-time-payments</code>).
      </li>
      <li>
        <strong>Read-Only Slugs</strong>: For critical pages, the slug may be
        locked (Read-Only) after publication to prevent accidental broken links.
        Contact a developer if a URL change is required for a live page.
      </li>
    </ul>
    <h2>Previewing and Support</h2>
    <p>Before publishing, you should always review your work.</p>
    <ul>
      <li>
        <strong>Previewing</strong>: Use the <strong>Preview button</strong>{" "}
        (eye icon) to see how the page looks within the CMS sidebar.
      </li>
      <li>
        <strong>View on Website</strong>: Hit the <strong>View</strong> button
        in the top right to see the page in a full browser tab on the
        development or production site.
      </li>
      <li>
        <strong>UAT Board</strong>: If you encounter bugs or need a specific
        module to support a new feature, log a ticket on the{" "}
        <strong>UAT board</strong>.
      </li>
      <li>
        <strong>Ticket Templates</strong>: When reporting issues, please use the
        <strong>reference ticket</strong> template to ensure consistency.
      </li>
    </ul>
    <h3>Best Practices for Assets</h3>
    <ul>
      <li>
        <strong>Images</strong>: Use <a href="https://squoosh.app/">Squoosh</a>{" "}
        to compress images before uploading. Aim for files under 200KB.
      </li>
      <li>
        <strong>Videos</strong>: Only upload <code>.mp4</code> files. Keep
        background videos under 5MB for optimal page performance.
      </li>
      <li>
        <strong>Alt Text</strong>: Always fill in the "Alternative Text" field
        for images to ensure accessibility and better SEO.
      </li>
    </ul>
    <h3>Quick Reference</h3>
    <p>
      <strong>Environment Variables:</strong>
    </p>
    <ul>
      <li>
        <code>SANITY_STUDIO_PROJECT_ID</code> - Your Sanity project ID
      </li>
      <li>
        <code>SANITY_STUDIO_DATASET</code> - Current dataset
        (development/production)
      </li>
      <li>
        <code>SANITY_STUDIO_API_VERSION</code> - API version
      </li>
      <li>
        <code>SANITY_STUDIO_PREVIEW_URL</code> - The hostname and port for the
        studio
      </li>
      <li>
        <code>SITE_URL</code> - Base site URL
      </li>
    </ul>
    <p>
      <strong>Block Development:</strong>
    </p>
    <p>When creating new blocks, remember to register them in:</p>
    <ol>
      <li>
        Schema definition in <code>studio/schemas/</code>
      </li>
      <li>
        Content blocks array in <code>studio/schemas/moduleTypes.ts</code>
      </li>
      <li>
        Component implementation in <code>frontend/components/</code>
      </li>
      <li>
        Query definition in <code>frontend/sanity/queries/</code>
      </li>
      <li>
        Block components mapping in
        <code>frontend/components/ModuleBuilder.tsx</code>
      </li>
    </ol>
  </>
);

export default Guide;
