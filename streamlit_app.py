import os
import streamlit as st
import streamlit.components.v1 as components

# Website HTML ditampilkan utuh sebagai komponen Streamlit; chat Loku dijawab fungsi chat() di server.py.
# GOOGLE_API_KEY diisi di Secrets Streamlit Cloud; secret tingkat atas otomatis jadi env var yang dibaca server.py.
from server import ChatRequest, chat

st.set_page_config(page_title="Maluku Vibes", page_icon="🌴", layout="wide")
st.markdown("<style>header, footer {display: none !important;} .block-container {padding: 0 !important; max-width: 100% !important;}"
            " iframe {display: block;}</style>", unsafe_allow_html=True)

# shortcut: komponen menyajikan seluruh folder ini (termasuk .env lokal), jalankan lokal dengan --server.address localhost.
website = components.declare_component("maluku_vibes", path=os.path.dirname(os.path.abspath(__file__)))

pertanyaan = website(jawaban=st.session_state.get("jawaban"), key="website", default=None)
if pertanyaan and pertanyaan["id"] != st.session_state.get("id_terakhir"):
    st.session_state.id_terakhir = pertanyaan["id"]
    st.session_state.jawaban = {"id": pertanyaan["id"], **chat(ChatRequest(message=pertanyaan["message"]))}
    st.rerun()
