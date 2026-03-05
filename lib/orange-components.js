import { defineComponent as E, createElementBlock as y, openBlock as i, createElementVNode as $, ref as w, computed as I, onMounted as U, resolveComponent as k, createVNode as S, withCtx as h, Fragment as A, renderList as B, createBlock as L, createCommentVNode as N, unref as R, toDisplayString as P, nextTick as H, watch as F, createSlots as O, createTextVNode as K, renderSlot as j, normalizeStyle as q } from "vue";
var G = /* @__PURE__ */ E({
  name: "Search",
  __name: "search",
  setup(t) {
    return (C, l) => (i(), y("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      $("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), J = G;
const Q = { class: "ds-directory-tree" }, X = ["onClick"], Y = {
  key: 0,
  class: "search-part"
}, Z = { class: "custom-tree-node-title" }, ee = ["innerHTML"], te = /* @__PURE__ */ E({
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
  setup(t, { emit: C }) {
    const l = t, c = C, d = w(l.defaultActiveIndex), s = w({}), T = w([]), b = w({}), p = (e, a) => {
      e && (T.value[a] = e);
    }, V = I(() => ({
      label: l.treeNodeLabel,
      children: "children",
      isLeaf: "isLeaf",
      id: l.treeNodeKey
    })), D = (e, a) => {
      if (!a || !e)
        return e;
      const r = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), g = new RegExp(`(${r})`, "gi");
      return e.replace(g, '<span class="highlight-keyword">$1</span>');
    }, v = async (e, a, r) => {
      try {
        const g = l.categories[r];
        if (!g) {
          a([]);
          return;
        }
        const _ = s.value[r] || "";
        if (e.level === 0) {
          const m = await l.lazyLoad(g.code, "", _);
          if (a(m), _ && m.length > 0) {
            await H();
            const n = [];
            m.forEach((o) => {
              const f = o[l.treeNodeKey];
              f && !o.isLeaf && n.push(f);
            }), b.value[r] = n;
          } else
            b.value[r] = [];
        } else if (e.level === 1 && _) {
          const m = await l.lazyLoad(g.code, e.data[l.treeNodeKey], _);
          a(m);
        } else {
          const m = await l.lazyLoad(g.code, e.data[l.treeNodeKey], "");
          a(m);
        }
      } catch (g) {
        console.error("Load tree node failed:", g), a([]);
      }
    }, u = (e) => {
      c("nodeClick", e);
    }, x = (e) => {
      c("categoryClick", e);
    };
    return U(() => {
      if (l.defaultActiveCode) {
        const e = l.categories.find((a) => a.code === l.defaultActiveCode);
        e && c("categoryClick", e);
      }
    }), (e, a) => {
      const r = k("el-icon"), g = k("el-input"), _ = k("el-tree"), m = k("el-collapse-item"), n = k("el-collapse");
      return i(), y("div", Q, [
        S(n, {
          modelValue: d.value,
          "onUpdate:modelValue": a[0] || (a[0] = (o) => d.value = o),
          accordion: ""
        }, {
          default: h(() => [
            (i(!0), y(
              A,
              null,
              B(t.categories, (o, f) => (i(), L(m, {
                key: o.code,
                title: o.name,
                name: f
              }, {
                title: h(() => [
                  $("div", {
                    class: "title-part",
                    onClick: (z) => x(o)
                  }, P(o.name), 9, X)
                ]),
                default: h(() => [
                  $("div", null, [
                    t.enableSearch ? (i(), y("div", Y, [
                      S(g, {
                        modelValue: s.value[f],
                        "onUpdate:modelValue": (z) => s.value[f] = z,
                        placeholder: t.searchPlaceholder
                      }, {
                        suffix: h(() => [
                          S(r, {
                            color: "#1C64DD",
                            size: 20,
                            class: "no-inherit"
                          }, {
                            default: h(() => [
                              S(R(J))
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ])) : N("v-if", !0),
                    (i(), L(_, {
                      ref_for: !0,
                      ref: (z) => p(z, f),
                      key: `tree-${f}-${s.value[f] || ""}`,
                      props: V.value,
                      load: (z, M) => v(z, M, f),
                      lazy: "",
                      "highlight-current": "",
                      "default-expanded-keys": b.value[f] || [],
                      "node-key": t.treeNodeKey,
                      onNodeClick: u,
                      class: "tree-scroll"
                    }, {
                      default: h(({ node: z }) => [
                        $("span", Z, [
                          $("span", {
                            innerHTML: D(z.label, s.value[f])
                          }, null, 8, ee)
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
}), W = (t, C) => {
  const l = t.__vccOpts || t;
  for (const [c, d] of C)
    l[c] = d;
  return l;
}, ae = /* @__PURE__ */ W(te, [["__scopeId", "data-v-c27ee2b8"]]), le = {
  install(t) {
    t.component("directory-tree", ae);
  }
}, ne = { class: "ds-data-table" }, oe = {
  key: 0,
  class: "pagination-part"
}, ie = /* @__PURE__ */ E({
  __name: "index",
  props: {
    data: {},
    columns: {},
    actions: {},
    enableSelection: { type: Boolean, default: !1 },
    showIndex: { type: Boolean, default: !0 },
    indexLabel: { default: "序号" },
    rowKey: { default: "id" },
    headerTheme: { default: "grey" },
    hidePagination: { type: Boolean, default: !1 },
    total: { default: 0 },
    pageSize: { default: 10 },
    currentPage: { default: 1 },
    pageSizes: { default: () => [10, 20, 50, 100, 200] },
    paginationLayout: { default: "total, sizes, prev, pager, next, jumper" },
    pagerCount: { default: 5 },
    nextText: { default: "下一页" },
    prevText: { default: "上一页" },
    actionColumnWidth: {},
    actionButtonWidth: { default: 70 }
  },
  emits: ["actionClick", "selectionChange", "sizeChange", "currentChange"],
  setup(t, { emit: C }) {
    const l = t, c = C, d = w(l.currentPage), s = w(l.pageSize), T = I(() => ({
      background: l.headerTheme === "blue" ? "#E2EEFE" : "#F2F5F9",
      color: "#222222",
      fontSize: "14px",
      height: l.headerTheme === "blue" ? "42px" : "50px",
      textAlign: "center"
    })), b = I(() => {
      if (l.hidePagination)
        return l.data;
      const e = (d.value - 1) * s.value, a = e + s.value;
      return l.data.slice(e, a);
    }), p = (e) => l.hidePagination ? e + 1 : (d.value - 1) * s.value + e + 1, V = (e, a) => e.visible !== void 0 ? typeof e.visible == "function" ? e.visible(a) : e.visible : !0, D = (e, a, r) => {
      c("actionClick", e, a, r);
    }, v = (e) => {
      c("selectionChange", e);
    }, u = (e) => {
      s.value = e, c("sizeChange", e);
    }, x = (e) => {
      d.value = e, c("currentChange", e);
    };
    return F(
      () => l.currentPage,
      (e) => {
        d.value = e;
      }
    ), F(
      () => l.pageSize,
      (e) => {
        s.value = e;
      }
    ), (e, a) => {
      const r = k("el-table-column"), g = k("el-button"), _ = k("el-table"), m = k("el-pagination");
      return i(), y("div", ne, [
        S(_, {
          data: b.value,
          border: "",
          stripe: "",
          "row-key": t.rowKey,
          style: { width: "100%", height: "calc(100% - 52px)" },
          "header-cell-style": T.value,
          onSelectionChange: v
        }, {
          default: h(() => [
            t.enableSelection ? (i(), L(r, {
              key: 0,
              "reserve-selection": !0,
              type: "selection",
              width: "70"
            })) : N("v-if", !0),
            t.showIndex ? (i(), L(r, {
              key: 1,
              type: "index",
              label: t.indexLabel,
              width: "70",
              index: p
            }, null, 8, ["label"])) : N("v-if", !0),
            (i(!0), y(
              A,
              null,
              B(t.columns, (n) => (i(), L(r, {
                key: n.prop,
                prop: n.prop,
                label: n.label,
                width: n.width,
                "min-width": n.minWidth,
                "show-overflow-tooltip": n.showOverflowTooltip !== !1,
                align: n.align || "center"
              }, O({
                _: 2
                /* DYNAMIC */
              }, [
                n.formatter ? {
                  name: "default",
                  fn: h((o) => [
                    K(
                      P(n.formatter(o.row, o.column, o.row[n.prop], o.$index)),
                      1
                      /* TEXT */
                    )
                  ]),
                  key: "0"
                } : e.$slots[n.prop] ? {
                  name: "default",
                  fn: h((o) => [
                    j(e.$slots, n.prop, {
                      row: o.row,
                      column: o.column,
                      index: o.$index
                    }, void 0, !0)
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["prop", "label", "width", "min-width", "show-overflow-tooltip", "align"]))),
              128
              /* KEYED_FRAGMENT */
            )),
            t.actions && t.actions.length > 0 ? (i(), L(r, {
              key: 2,
              label: "操作",
              fixed: "right",
              width: t.actionColumnWidth || t.actions.length * t.actionButtonWidth
            }, {
              default: h((n) => [
                (i(!0), y(
                  A,
                  null,
                  B(t.actions, (o) => (i(), y(
                    A,
                    {
                      key: o.name
                    },
                    [
                      V(o, n.row) ? (i(), L(g, {
                        key: 0,
                        link: "",
                        size: "default",
                        type: o.type || "primary",
                        onClick: (f) => D(o, n.row, n.$index)
                      }, {
                        default: h(() => [
                          K(
                            P(o.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["type", "onClick"])) : N("v-if", !0)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["width"])) : N("v-if", !0)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["data", "row-key", "header-cell-style"]),
        t.hidePagination ? N("v-if", !0) : (i(), y("div", oe, [
          S(m, {
            "current-page": d.value,
            "onUpdate:currentPage": a[0] || (a[0] = (n) => d.value = n),
            "page-size": s.value,
            "onUpdate:pageSize": a[1] || (a[1] = (n) => s.value = n),
            "page-sizes": t.pageSizes,
            layout: t.paginationLayout,
            total: t.total,
            "pager-count": t.pagerCount,
            "next-text": t.nextText,
            "prev-text": t.prevText,
            onSizeChange: u,
            onCurrentChange: x
          }, null, 8, ["current-page", "page-size", "page-sizes", "layout", "total", "pager-count", "next-text", "prev-text"])
        ]))
      ]);
    };
  }
}), ce = /* @__PURE__ */ W(ie, [["__scopeId", "data-v-6525aa39"]]), se = {
  install(t) {
    t.component("data-table", ce);
  }
}, re = { class: "filter-tags" }, de = /* @__PURE__ */ E({
  __name: "index",
  props: {
    title: {},
    tagsListData: {},
    titleMinWidth: {},
    defaultActive: {}
  },
  emits: ["returnChecked", "singleChecked"],
  setup(t, { expose: C, emit: l }) {
    const c = t, d = l, s = c.defaultActive?.length ?? 0, T = w(s === c.tagsListData.length), b = w(s > 0 && s < c.tagsListData.length), p = w(c.defaultActive ?? []), V = (v) => {
      v ? (p.value = [...c.tagsListData], b.value = !1, d("returnChecked", p.value)) : (p.value = [], b.value = !1, d("returnChecked", []));
    }, D = (v) => {
      const u = v.length;
      T.value = u === c.tagsListData.length, b.value = u > 0 && u < c.tagsListData.length;
      const x = v[v.length - 1];
      if (x?.isIncompatible)
        p.value = [x], d("singleChecked", [x]);
      else {
        const e = v.filter((a) => !a.isIncompatible);
        p.value = e, d("singleChecked", e);
      }
    };
    return C({ handleCheckAllChange: V }), (v, u) => {
      const x = k("el-checkbox"), e = k("el-checkbox-group");
      return i(), y("div", re, [
        $(
          "div",
          {
            class: "filter-tags__label",
            style: q(t.titleMinWidth ? { minWidth: t.titleMinWidth } : {})
          },
          P(t.title),
          5
          /* TEXT, STYLE */
        ),
        S(x, {
          modelValue: T.value,
          "onUpdate:modelValue": u[0] || (u[0] = (a) => T.value = a),
          indeterminate: b.value,
          onChange: V
        }, {
          default: h(() => [...u[2] || (u[2] = [
            $(
              "div",
              { class: "filter-tags__all-btn" },
              "全部",
              -1
              /* CACHED */
            )
          ])]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "indeterminate"]),
        S(e, {
          modelValue: p.value,
          "onUpdate:modelValue": u[1] || (u[1] = (a) => p.value = a),
          onChange: D
        }, {
          default: h(() => [
            (i(!0), y(
              A,
              null,
              B(t.tagsListData, (a, r) => (i(), L(x, {
                key: r,
                label: a
              }, {
                default: h(() => [
                  K(
                    P(a.title),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["label"]))),
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
}), ue = /* @__PURE__ */ W(de, [["__scopeId", "data-v-893a94e3"]]), he = {
  install(t) {
    t.component("filter-tags", ue);
  }
}, fe = [
  le,
  se,
  he
], pe = {
  install(t) {
    fe.forEach((C) => {
      t.use(C);
    });
  }
};
export {
  pe as default
};
