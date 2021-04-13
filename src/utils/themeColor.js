export const THTEMCOLOR = function (colorName) {
    // 样式变量请参照 antd https://ant.design/docs/react/customize-theme-cn
    let color = {
        'red': {
            '@heading-color': colorName, // 标题色
            '@text-color': colorName, // 主文本色
            '@text-color-secondary': colorName, // 次文本色
            '@disabled-color': colorName, // 失效色
            '@border-color-base': colorName, // 边框色
        },
        'pink': {
            '@heading-color': colorName, // 标题色
            '@text-color': colorName, // 主文本色
            '@text-color-secondary': colorName, // 次文本色
            '@disabled-color': colorName, // 失效色
            '@border-color-base': colorName, // 边框色
        },
        '#99CCCC':{
            '@heading-color': colorName, // 标题色
            '@text-color': colorName, // 主文本色
            '@text-color-secondary': colorName, // 次文本色
            '@disabled-color': colorName, // 失效色
            '@border-color-base': colorName, // 边框色
        },
        'globalColor': {
            '@primary-color': '#1890ff', // 全局主色
            '@link-color': '#1890ff', // 链接色
            '@success-color': '#52c41a', // 成功色
            '@warning-color': '#faad14', // 警告色
            '@error-color': '#f5222d', // 错误色
            '@font-size-base': '14px', // 主字号
            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            '@text-color-secondary': ' rgba(0, 0, 0, 0.45)', // 次文本色
            '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
            '@border-radius-base': '2px', // 组件/浮层圆角
            '@border-color-base': '#d9d9d9', // 边框色
            '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)' // 浮层阴影
        }
    }
    return color[colorName] ? color[colorName] : color.globalColor

}
