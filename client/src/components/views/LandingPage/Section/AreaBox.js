import React from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function AreaBox(props) {

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox>
                <span>{value.name}</span>
            </Checkbox>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="지역" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default AreaBox
