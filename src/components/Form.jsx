import React, { useState } from "react";
import { Grid } from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import "assets/css/modal.css"
import { Button } from "material-ui";

function Form({ ...props }) {
    const [formData, setFormData] = useState({})
    const { formContent, title,show, saveClick, updateFormData} = props
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <Grid container className='modal-main'>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle={title}
                        content={formContent}
                        footer={
                            <Button color="primary" onClick={() => saveClick(formData)}> Save</Button>
                        }
                    />
                </ItemGrid>
            </Grid>
        </div>
    )
}

export default Form;