import { useCallback, useEffect, useState } from 'react';
import './style.css';

function getValByAttrArr(obj, attrs) {
    let val = '';
    let copyData = obj;
    for (let i = 0; i < attrs.length; i++) {
        val = copyData[attrs[i]];
        if (!val) return '';
        copyData = val;
    }
    return val;
}

const Table = (props) => {
    const { dataSource, children, style, className } = props;

    const handleChildren = useCallback(() => {
        const newChildren = Array.isArray(children) ? children : [children];
        // 保存渲染的函数，也就是自定义 cell 属性
        let renders = [];
        // 保存每一列的标题
        let actualTiles = [];
        // 保存属性值，是一个数组
        let attrs = [];
        // 保存唯一字段的属性名
        let uniqueIdAttr = "";
        newChildren.forEach((children, index) => {
            // 读取孩子的 props 属性
            const { title, htmlTitle, dataIndex, cell } = children?.props || {};
            // 保存每一项的新标题
            actualTiles.push(title || '');
            // 处理 dataIndex ，方便拿取数据中的属性名
            let attr = dataIndex ? dataIndex : '';
            attr = /\w+.\w+/.test(attr) ? attr.split('.') : [attr];
            attrs.push(attr);
            // 如果设置了唯一值，那么就保存起来，这个值有且只有一个
            if (!uniqueIdAttr && htmlTitle === "Unique Id") {
                uniqueIdAttr = attr;
            }
            // 如果是渲染函数，那么直接赋值
            renders[index] = cell;
        });
        return {
            renders,
            actualTiles,
            attrs,
            uniqueIdAttr
        };
    }, [children]);
    const { renders, actualTiles, attrs, uniqueIdAttr } = handleChildren();
    return (
        <table className={`${className} table-scope`} style={style}>
            <thead className={'thead-scope'}>
                <tr className={'tr-scope'}>
                    {actualTiles.map((title, index) => {
                        return <th className={'th-scope'} key={index}>{title}</th>;
                    })}
                </tr>
            </thead>
            <tbody className={'tbody-scope'}>
                {(dataSource || []).map((data, fatherI) => {
                    return (
                        <tr key={getValByAttrArr(data, uniqueIdAttr)} className={'tr-scope'}>
                            {renders.map((render, index) => {
                                // 先拿到对应属性的值
                                const attrVal = getValByAttrArr(data, attrs[index]);
                                // 如果 render 存在值，那么就使用 render ，否则直接填写内容
                                const content = render ? render(attrVal, index, data) : attrVal;
                                return (
                                    <td
                                        className={'td-scope'}
                                        key={index + fatherI}
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

Table.Column = () => {
    return null;
};

export default Table;
