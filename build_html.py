import pathlib

# Bestanden
html_file = pathlib.Path("index.html")
css_file = pathlib.Path("style.css")
js_file = pathlib.Path("script.js")
output_file = pathlib.Path("index_combined.html")

# Lees bestanden
html_content = html_file.read_text(encoding="utf-8")
css_content = css_file.read_text(encoding="utf-8") if css_file.exists() else ""
js_content = js_file.read_text(encoding="utf-8") if js_file.exists() else ""

# Vervang <link> naar CSS met inline <style>
import re
html_content = re.sub(
    r'<link[^>]+href=["\'].*style\.css["\'][^>]*>',
    f"<style>\n{css_content}\n</style>",
    html_content,
    flags=re.IGNORECASE
)

# Vervang <script src="script.js"> met inline <script>
html_content = re.sub(
    r'<script[^>]+src=["\'].*script\.js["\'][^>]*>\s*</script>',
    f"<script>\n{js_content}\n</script>",
    html_content,
    flags=re.IGNORECASE
)

# Schrijf gecombineerd bestand
output_file.write_text(html_content, encoding="utf-8")
print(f"Samengevoegde HTML opgeslagen in: {output_file}")
