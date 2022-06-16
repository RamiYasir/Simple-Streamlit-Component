import streamlit.components.v1 as components

_component_func = components.declare_component(
    "image_container",
    url="http://localhost:3001",
)
def image_container():
    component_value = _component_func()
    return component_value


import streamlit as st

container = image_container()
st.markdown("An Ankylosaurus")