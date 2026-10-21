import React from 'react';

const Page = ({ children, singleMode, id }) => (<div
    id={id}
    style={{ width: "210mm", height: singleMode ? "297mm" : "" }}
>
    {children}
</div>);

export default Page;