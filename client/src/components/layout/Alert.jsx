
//rafcp 
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ( {alerts} )=> //kndkhlo props but andir destructuring so ndiro alerts hit an object mn props li lteht li hia jbnah mn reducer
    alerts !== null && alerts.length > 0 && alerts.map(item => (
        <div key={item.id} className={ "alert alert-"+item.alertType }>
            {item.msg}
        </div>
    ))
        
    

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({//state fiha gae states li f reducer 
    alerts: state.alert //flwl reducer kan fih ghir alert so jbnah
});

export default connect(mapStateToProps)(Alert);//1 argmts : mapStateToProps cause it contains state so we can use them here
