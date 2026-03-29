function encodeAngleBrackets(input = "") {
  return String(input).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function encodeForJsLevel5(input = "") {
  return String(input)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "\\'");
}

// lọc chưa đủ Filter kiểu blacklist
function stripMostTagsAndAttrs(input = "") {
  let out = String(input);
  out = out.replace(
    /<\/?(script|iframe|object|embed|link|meta|style)[^>]*>/gi,
    "",
  );
  out = out.replace(
    /\s(srcdoc|xlink:href|formaction|data)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi,
    "",
  );

  return out;
}
// lọc chưa đủ Filter kiểu while list
function allowOnlyCustomTags(input = "") {
  let out = String(input);

  // Chỉ cho phép đúng custom tag <xss> ... </xss>
  out = out.replace(/<\/?(?!xss\b)[a-z][a-z0-9-]*\b[^>]*>/gi, "");

  // Chỉ giữ đúng 3 attribute phục vụ lab gốc:
  // id, onfocus, tabindex
  out = out.replace(
    /\s(?!id\b|onfocus\b|tabindex\b)[a-zA-Z0-9:-]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi,
    "",
  );

  return out;
}

function renderLevel(level, payload = "") {
  const cleanPayload = String(payload || "");

  switch (level.id) {
    case 1: {
      const reflected = encodeAngleBrackets(cleanPayload);
      return `
        <div class="preview-card">
          <label class="preview-label">Search preview</label>
          <input class="demo-input" type="text" value="${reflected}" placeholder="Payload appears here">
        </div>
      `;
    }

    case 2: {
      const reflected = encodeAngleBrackets(cleanPayload);
      return `
        <div class="preview-card">
          <div class="output-title">JavaScript output</div>
          <div id="statusText" class="status-line">Preview loaded.</div>
        </div>
        <script>
          var searchTerm = '${reflected}';
          document.getElementById('statusText').innerHTML = 'Search term: ' + searchTerm;
        </script>
      `;
    }

    case 3: {
      return `
        <div class="preview-card">
          <div class="output-title">HTML output</div>
          <div class="html-output">${stripMostTagsAndAttrs(cleanPayload)}</div>
        </div>
      `;
    }

    case 4: {
      return `
        <div class="preview-card">
          <div class="output-title">Custom tag output</div>
          <div class="html-output">${allowOnlyCustomTags(cleanPayload)}</div>
        </div>
      `;
    }

    case 5: {
      const reflected = encodeForJsLevel5(cleanPayload);
      return `
        <div class="preview-card">
          <div class="output-title">JavaScript output</div>
          <div id="keywordText" class="status-line">Waiting...</div>
        </div>
        <script>
          var keyword = '${reflected}';
          document.getElementById('keywordText').innerHTML = 'Keyword: ' + keyword;
        </script>
      `;
    }

    default:
      return '<div class="preview-card">No output</div>';
  }
}

module.exports = {
  renderLevel,
};
