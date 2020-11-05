import React, { useState }from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function AreaBox(props) {

    const [Checked, setChecked] = useState([])

    const handdleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]

        if(currentIndex === -1){
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handdleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span>
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
