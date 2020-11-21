import React, { useState }from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

//지역 필터
//작동 방식은 array방식으로. 두번클릭했을 땐 해제되는 방식
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

    //map으로 index for문 도는건 따로 공부하세요  ^^
    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handdleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span style={{marginRight:'10px'}}>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="지역" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default AreaBox
