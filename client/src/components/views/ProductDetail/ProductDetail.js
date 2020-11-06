import React from 'react'

class ProductDetail extends React.Component {
    render() {
        const { params } = this.props.match;
        
        return (
            <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
             <p>hello?
            key1 : { params.key1 },
            </p>
            </div>
        )
    }
}

export default ProductDetail