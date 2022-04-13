import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { createPlayground, getPlaygroundsDropdown } from "../../api/playgrounds";
import { createBooking } from '../../api/booking';
import { RegularCard, Table, ItemGrid } from "components";
import { getServiceDropdown } from '../../api/services';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function PlaygroundForm({ ...props }) {
    const { show, classes, saveClick } = props
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            startTime: "07:30",
            endTime: "8:40",
            date: '2017-05-24',
            playground: {}
        }
    });
    const onSubmit = d => {
        const data = {
            name: d.name,
            description: d.description,
            services: d.services.map(s => s.value),
            dayShift: {
                stat: d.dayStartTime,
                end: d.dayEndTime
            },
            nightShift: {
                start: d.nightStartTime,
                end: d.nightEndTime
            },
            type: d.type
        }
        console.log(data)
        //createPlayground(data);

    }

    const [services, setServices] = useState([]);
    useEffect(() => {
        getServiceDropdown().then(data => setServices(data))
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">إسم الملعب </label>
                    <input id="name" {...register("name")} />
                </ItemGrid>
                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">الوصف</label>
                    <textarea id="description" {...register("description")} ></textarea>
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="services">الخدمات</label>
                    <Controller
                        name="services"
                        control={control}
                        render={({ field }) => <Select
                            {...field}
                            isMulti
                            options={services}
                        />}
                    />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">صور الملعب</label>
                    <input id="name" {...register("name")} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="city">المدينة</label>
                    <input id="city" {...register("city")} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">السعر</label>
                    <input id="name" {...register("name")} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="type">نوع الأرضية</label>
                    <input id="type" {...register("type")} />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name"></label>
                    <Controller
                        name="dayStartTime"
                        control={control}
                        render={({ field }) => <TextField
                            id="time"
                            label="زمن بداية الوردية النهارية"
                            {...field}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />}
                    />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">زمن نهاية الوردية النهارية</label>
                    <Controller
                        name="dayEndTime"
                        control={control}
                        render={({ field }) => <TextField
                            id="time"
                            label="زمن نهاية الوردية النهارية"
                            {...field}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />}
                    />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">زمن بداية الوردية المسائية</label>
                    <Controller
                        name="nightStartTime"
                        control={control}
                        render={({ field }) => <TextField
                            id="time"
                            label="زمن بداية الوردية المسائية"
                            {...field}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />}
                    />
                </ItemGrid>

                <ItemGrid sx={12} md={6}>
                    <label htmlFor="name">زمن نهاية الوردية المسائية</label>
                    <Controller
                        name="nightEndTime"
                        control={control}
                        render={({ field }) => <TextField
                            id="time"
                            label="زمن نهاية الوردية المسائية"
                            {...field}
                            type="time"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />}
                    />
                </ItemGrid>
                <input type="submit" />
            </form>
        </div>
    )
}

export default withStyles(styles)(PlaygroundForm);