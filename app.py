import streamlit as st
import pathlib

# Pad naar self-contained HTML
html_path = pathlib.Path("index.html")  # of je gecombineerde HTML-bestand

# Lees de HTML-inhoud
html_content = html_path.read_text(encoding="utf-8")

# Streamlit-app
st.title("Mijn interactieve map")

# Render de HTML inclusief inline CSS en JS
st.components.v1.html(
    html_content,
    height=800,  # pas aan als nodig
    scrolling=True
)
