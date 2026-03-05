import { defineComponent as V, createElementBlock as N, openBlock as f, createElementVNode as m, ref as k, computed as E, onMounted as D, resolveComponent as h, createVNode as C, withCtx as u, Fragment as M, renderList as S, createBlock as w, createCommentVNode as P, unref as R, toDisplayString as U, nextTick as H } from "vue";
var F = /* @__PURE__ */ V({
  name: "Search",
  __name: "search",
  setup(l) {
    return (y, t) => (f(), N("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      m("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), O = F;
const j = { class: "ds-directory-tree" }, q = ["onClick"], G = {
  key: 0,
  class: "search-part"
}, I = { class: "custom-tree-node-title" }, J = ["innerHTML"], Q = /* @__PURE__ */ V({
  __name: "index",
  props: {
    categories: {},
    lazyLoad: {},
    defaultActiveIndex: { default: 0 },
    defaultActiveCode: { default: "" },
    enableSearch: { type: Boolean, default: !0 },
    searchPlaceholder: { default: "快速检索" },
    treeNodeKey: { default: "code" },
    treeNodeLabel: { default: "name" }
  },
  emits: ["nodeClick", "categoryClick"],
  setup(l, { emit: y }) {
    const t = l, p = y, v = k(t.defaultActiveIndex), _ = k({}), x = k([]), L = k({}), T = (e, a) => {
      e && (x.value[a] = e);
    }, K = E(() => ({
      label: t.treeNodeLabel,
      children: "children",
      isLeaf: "isLeaf",
      id: t.treeNodeKey
    })), b = (e, a) => {
      if (!a || !e)
        return e;
      const s = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), c = new RegExp(`(${s})`, "gi");
      return e.replace(c, '<span class="highlight-keyword">$1</span>');
    }, z = async (e, a, s) => {
      try {
        const c = t.categories[s];
        if (!c) {
          a([]);
          return;
        }
        const i = _.value[s] || "";
        if (e.level === 0) {
          const n = await t.lazyLoad(c.code, "", i);
          if (a(n), i && n.length > 0) {
            await H();
            const g = [];
            n.forEach((r) => {
              const o = r[t.treeNodeKey];
              o && !r.isLeaf && g.push(o);
            }), L.value[s] = g;
          } else
            L.value[s] = [];
        } else if (e.level === 1 && i) {
          const n = await t.lazyLoad(c.code, e.data[t.treeNodeKey], i);
          a(n);
        } else {
          const n = await t.lazyLoad(c.code, e.data[t.treeNodeKey], "");
          a(n);
        }
      } catch (c) {
        console.error("Load tree node failed:", c), a([]);
      }
    }, $ = (e) => {
      p("nodeClick", e);
    }, A = (e) => {
      p("categoryClick", e);
    };
    return D(() => {
      if (t.defaultActiveCode) {
        const e = t.categories.find((a) => a.code === t.defaultActiveCode);
        e && p("categoryClick", e);
      }
    }), (e, a) => {
      const s = h("el-icon"), c = h("el-input"), i = h("el-tree"), n = h("el-collapse-item"), g = h("el-collapse");
      return f(), N("div", j, [
        C(g, {
          modelValue: v.value,
          "onUpdate:modelValue": a[0] || (a[0] = (r) => v.value = r),
          accordion: ""
        }, {
          default: u(() => [
            (f(!0), N(
              M,
              null,
              S(l.categories, (r, o) => (f(), w(n, {
                key: r.code,
                title: r.name,
                name: o
              }, {
                title: u(() => [
                  m("div", {
                    class: "title-part",
                    onClick: (d) => A(r)
                  }, U(r.name), 9, q)
                ]),
                default: u(() => [
                  m("div", null, [
                    l.enableSearch ? (f(), N("div", G, [
                      C(c, {
                        modelValue: _.value[o],
                        "onUpdate:modelValue": (d) => _.value[o] = d,
                        placeholder: l.searchPlaceholder
                      }, {
                        suffix: u(() => [
                          C(s, {
                            color: "#1C64DD",
                            size: 20,
                            class: "no-inherit"
                          }, {
                            default: u(() => [
                              C(R(O))
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ])) : P("v-if", !0),
                    (f(), w(i, {
                      ref_for: !0,
                      ref: (d) => T(d, o),
                      key: `tree-${o}-${_.value[o] || ""}`,
                      props: K.value,
                      load: (d, B) => z(d, B, o),
                      lazy: "",
                      "highlight-current": "",
                      "default-expanded-keys": L.value[o] || [],
                      "node-key": l.treeNodeKey,
                      onNodeClick: $,
                      class: "tree-scroll"
                    }, {
                      default: u(({ node: d }) => [
                        m("span", I, [
                          m("span", {
                            innerHTML: b(d.label, _.value[o])
                          }, null, 8, J)
                        ])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["props", "load", "default-expanded-keys", "node-key"]))
                  ])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["title", "name"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]);
    };
  }
}), W = (l, y) => {
  const t = l.__vccOpts || l;
  for (const [p, v] of y)
    t[p] = v;
  return t;
}, X = /* @__PURE__ */ W(Q, [["__scopeId", "data-v-c27ee2b8"]]), Z = {
  install(l) {
    l.component("directory-tree", X);
  }
};
export {
  Z as default
};
