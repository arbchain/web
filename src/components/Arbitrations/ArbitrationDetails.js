/* eslint-disable */
import React, {useState} from 'react';
import { Main, Tabs, Box } from '@aragon/ui'

function Details(){
    const [selected, setSelected] = useState(0)
    return(
        <>
            <Main layout={false}>
                <div style={{marginLeft : "20vw", marginRight: "2vw", marginTop : "20vh", display : "grid", gridTemplateRows: "2fr 1fr"}}>
                    <div>
                        <p>back</p>
                        <p>card</p>
                        <Tabs
                            items={['Statements', 'Agreements']}
                            selected={selected}
                            onChange={setSelected}
                        />
                    </div>
                    <div>
                        <p>timeline</p>
                    </div>
                </div>
            </Main>
        </>
    )
}

export default Details;