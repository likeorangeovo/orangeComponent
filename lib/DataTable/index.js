import { defineComponent as D, ref as y, computed as w, watch as m, resolveComponent as p, createElementBlock as s, openBlock as i, createVNode as b, createCommentVNode as g, withCtx as h, createBlock as f, Fragment as x, renderList as C, createSlots as N, createTextVNode as k, toDisplayString as S, renderSlot as V } from "vue";
const K = { class: "ds-data-table" }, O = {
  key: 0,
  class: "pagination-part"
}, U = /* @__PURE__ */ D({
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
  setup(t, { emit: v }) {
    const l = t, d = v, r = y(l.currentPage), u = y(l.pageSize), z = w(() => ({
      background: l.headerTheme === "blue" ? "#E2EEFE" : "#F2F5F9",
      color: "#222222",
      fontSize: "14px",
      height: l.headerTheme === "blue" ? "42px" : "50px",
      textAlign: "center"
    })), T = w(() => {
      if (l.hidePagination)
        return l.data;
      const e = (r.value - 1) * u.value, o = e + u.value;
      return l.data.slice(e, o);
    }), P = (e) => l.hidePagination ? e + 1 : (r.value - 1) * u.value + e + 1, B = (e, o) => e.visible !== void 0 ? typeof e.visible == "function" ? e.visible(o) : e.visible : !0, L = (e, o, c) => {
      d("actionClick", e, o, c);
    }, $ = (e) => {
      d("selectionChange", e);
    }, E = (e) => {
      u.value = e, d("sizeChange", e);
    }, F = (e) => {
      r.value = e, d("currentChange", e);
    };
    return m(
      () => l.currentPage,
      (e) => {
        r.value = e;
      }
    ), m(
      () => l.pageSize,
      (e) => {
        u.value = e;
      }
    ), (e, o) => {
      const c = p("el-table-column"), W = p("el-button"), I = p("el-table"), A = p("el-pagination");
      return i(), s("div", K, [
        b(I, {
          data: T.value,
          border: "",
          stripe: "",
          "row-key": t.rowKey,
          style: { width: "100%", height: "calc(100% - 52px)" },
          "header-cell-style": z.value,
          onSelectionChange: $
        }, {
          default: h(() => [
            t.enableSelection ? (i(), f(c, {
              key: 0,
              "reserve-selection": !0,
              type: "selection",
              width: "70"
            })) : g("v-if", !0),
            t.showIndex ? (i(), f(c, {
              key: 1,
              type: "index",
              label: t.indexLabel,
              width: "70",
              index: P
            }, null, 8, ["label"])) : g("v-if", !0),
            (i(!0), s(
              x,
              null,
              C(t.columns, (n) => (i(), f(c, {
                key: n.prop,
                prop: n.prop,
                label: n.label,
                width: n.width,
                "min-width": n.minWidth,
                "show-overflow-tooltip": n.showOverflowTooltip !== !1,
                align: n.align || "center"
              }, N({
                _: 2
                /* DYNAMIC */
              }, [
                n.formatter ? {
                  name: "default",
                  fn: h((a) => [
                    k(
                      S(n.formatter(a.row, a.column, a.row[n.prop], a.$index)),
                      1
                      /* TEXT */
                    )
                  ]),
                  key: "0"
                } : e.$slots[n.prop] ? {
                  name: "default",
                  fn: h((a) => [
                    V(e.$slots, n.prop, {
                      row: a.row,
                      column: a.column,
                      index: a.$index
                    }, void 0, !0)
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["prop", "label", "width", "min-width", "show-overflow-tooltip", "align"]))),
              128
              /* KEYED_FRAGMENT */
            )),
            t.actions && t.actions.length > 0 ? (i(), f(c, {
              key: 2,
              label: "操作",
              fixed: "right",
              width: t.actionColumnWidth || t.actions.length * t.actionButtonWidth
            }, {
              default: h((n) => [
                (i(!0), s(
                  x,
                  null,
                  C(t.actions, (a) => (i(), s(
                    x,
                    {
                      key: a.name
                    },
                    [
                      B(a, n.row) ? (i(), f(W, {
                        key: 0,
                        link: "",
                        size: "default",
                        type: a.type || "primary",
                        onClick: (q) => L(a, n.row, n.$index)
                      }, {
                        default: h(() => [
                          k(
                            S(a.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["type", "onClick"])) : g("v-if", !0)
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
            }, 8, ["width"])) : g("v-if", !0)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["data", "row-key", "header-cell-style"]),
        t.hidePagination ? g("v-if", !0) : (i(), s("div", O, [
          b(A, {
            "current-page": r.value,
            "onUpdate:currentPage": o[0] || (o[0] = (n) => r.value = n),
            "page-size": u.value,
            "onUpdate:pageSize": o[1] || (o[1] = (n) => u.value = n),
            "page-sizes": t.pageSizes,
            layout: t.paginationLayout,
            total: t.total,
            "pager-count": t.pagerCount,
            "next-text": t.nextText,
            "prev-text": t.prevText,
            onSizeChange: E,
            onCurrentChange: F
          }, null, 8, ["current-page", "page-size", "page-sizes", "layout", "total", "pager-count", "next-text", "prev-text"])
        ]))
      ]);
    };
  }
}), j = (t, v) => {
  const l = t.__vccOpts || t;
  for (const [d, r] of v)
    l[d] = r;
  return l;
}, R = /* @__PURE__ */ j(U, [["__scopeId", "data-v-6525aa39"]]), H = {
  install(t) {
    t.component("data-table", R);
  }
};
export {
  H as default
};
