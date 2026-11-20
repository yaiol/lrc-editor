//! Icons the `dioxus-free-icons` release does not have: lucide glyphs it does not ship yet, drawn the way
//! it draws its own (same view box, stroke and caps).

use dioxus::prelude::*;
use dioxus_free_icons::IconShape;

/// lucide `save-plus`.
#[derive(Clone, Copy, PartialEq)]
pub struct LdSavePlus;

impl IconShape for LdSavePlus {
    fn view_box(&self) -> &str {
        "0 0 24 24"
    }
    fn xmlns(&self) -> &str {
        "http://www.w3.org/2000/svg"
    }
    fn fill_and_stroke<'a>(&self, user_color: &'a str) -> (&'a str, &'a str, &'a str) {
        ("none", user_color, "2")
    }
    fn stroke_linecap(&self) -> &str {
        "round"
    }
    fn stroke_linejoin(&self) -> &str {
        "round"
    }
    fn child_elements(&self) -> Element {
        rsx! {
            path { d: "M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12" }
            path { d: "M16 13H8a1 1 0 0 0-1 1v7" }
            path { d: "M19 22v-6" }
            path { d: "M22 19h-6" }
            path { d: "M7 3v4a1 1 0 0 0 1 1h7" }
        }
    }
}
