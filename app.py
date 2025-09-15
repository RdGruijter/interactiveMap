import streamlit as st
import pathlib

# Pad naar je lokale HTML-bestand
html_path = pathlib.Path("index.html")

# Laad HTML-inhoud
html_content = html_path.read_text(encoding="utf-8")

# Render in Streamlit
st.components.v1.html(html_content, height=800, scrolling=True)
