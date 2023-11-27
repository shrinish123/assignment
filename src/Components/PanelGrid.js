import React from 'react'
import Panel from './Panel';
import '../styles/PanelGrid.css';

function PanelGrid(){
  return (
    <>
        <div className='container'>
            <div className='panel-grid'>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
                <Panel/>
            </div>
        </div>
        
    </>
  )
}

export default PanelGrid