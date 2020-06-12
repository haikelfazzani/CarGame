import React from 'react';

export default function Select ({ data, onChange, value, toolTip, clx = "btn btn-primary disp-none mr-2" }) {
  return (<select
    className={clx}
    onChange={onChange}
    value={value}
    data-toggle="tooltip"
    data-placement="top"
    title={toolTip}>
    {data.map((d, i) => <option value={d} key={d + i}>{d}</option>)}
  </select>);
}