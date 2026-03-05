import { defineComponent as L, ref as h, resolveComponent as C, createElementBlock as p, openBlock as f, createElementVNode as _, createVNode as x, normalizeStyle as I, toDisplayString as b, withCtx as v, Fragment as y, renderList as A, createBlock as W, createTextVNode as B } from "vue";
const M = { class: "filter-tags" }, N = /* @__PURE__ */ L({
  __name: "index",
  props: {
    title: {},
    tagsListData: {},
    titleMinWidth: {},
    defaultActive: {}
  },
  emits: ["returnChecked", "singleChecked"],
  setup(e, { expose: u, emit: c }) {
    const l = e, o = c, g = l.defaultActive?.length ?? 0, m = h(g === l.tagsListData.length), d = h(g > 0 && g < l.tagsListData.length), a = h(l.defaultActive ?? []), k = (s) => {
      s ? (a.value = [...l.tagsListData], d.value = !1, o("returnChecked", a.value)) : (a.value = [], d.value = !1, o("returnChecked", []));
    }, V = (s) => {
      const t = s.length;
      m.value = t === l.tagsListData.length, d.value = t > 0 && t < l.tagsListData.length;
      const i = s[s.length - 1];
      if (i?.isIncompatible)
        a.value = [i], o("singleChecked", [i]);
      else {
        const r = s.filter((n) => !n.isIncompatible);
        a.value = r, o("singleChecked", r);
      }
    };
    return u({ handleCheckAllChange: k }), (s, t) => {
      const i = C("el-checkbox"), r = C("el-checkbox-group");
      return f(), p("div", M, [
        _(
          "div",
          {
            class: "filter-tags__label",
            style: I(e.titleMinWidth ? { minWidth: e.titleMinWidth } : {})
          },
          b(e.title),
          5
          /* TEXT, STYLE */
        ),
        x(i, {
          modelValue: m.value,
          "onUpdate:modelValue": t[0] || (t[0] = (n) => m.value = n),
          indeterminate: d.value,
          onChange: k
        }, {
          default: v(() => [...t[2] || (t[2] = [
            _(
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
        x(r, {
          modelValue: a.value,
          "onUpdate:modelValue": t[1] || (t[1] = (n) => a.value = n),
          onChange: V
        }, {
          default: v(() => [
            (f(!0), p(
              y,
              null,
              A(e.tagsListData, (n, D) => (f(), W(i, {
                key: D,
                label: n
              }, {
                default: v(() => [
                  B(
                    b(n.title),
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
}), E = (e, u) => {
  const c = e.__vccOpts || e;
  for (const [l, o] of u)
    c[l] = o;
  return c;
}, F = /* @__PURE__ */ E(N, [["__scopeId", "data-v-893a94e3"]]), T = {
  install(e) {
    e.component("filter-tags", F);
  }
};
export {
  T as default
};
