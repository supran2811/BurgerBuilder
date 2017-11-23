import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
        <p>logo , sidebar , toolbar</p>
        <main>
            {props.children}
        </main>
    </Aux>
);
export default layout;
