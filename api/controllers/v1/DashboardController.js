module.exports = {
    lastWatt: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery('select *,watts/360 as wh from tp_last_electric;');
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    lastDay: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with rows as (
                select ordinality,round((coalesce(w/360,0))::numeric,4) as wh,to_char((tiem_register + ordinality * (interval '10 second'))-interval '10 second','HH24:mi:SS') as tiem_registro,id
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where tiem_register>= date_trunc('hour',now())-interval '12 hours'
                order by 4,1 asc)
                select array(select wh from rows) as series ,array(select tiem_registro from rows) as category`);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },
    lastValuesDay: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with rows as (
                select ordinality,round((coalesce(w/360,0))::numeric,4) as wh,to_char((tiem_register + ordinality * (interval '10 second'))-interval '10 second','HH24:mi:SS') as tiem_registro,id
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                order by 4 desc ,1 desc limit 3)
                select array(select wh from rows) as series ,array(select tiem_registro from rows) as category;`);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    kwhActualDay: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            select round(((sum(coalesce(w/360,0))/1000))::numeric,2) as value
            from tp_data_electric, unnest(watts) WITH ORDINALITY w
            where date_trunc('day',tiem_register)=date_trunc('day',now());
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    kwhActualMonth: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with data as (
                select w/360 as watts,tiem_register
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where date_trunc('month',tiem_register)=date_trunc('month',now())
                union all
                select w/360 as watts,tiem_register
                  from tp_data_electric_historic, unnest(watts) WITH ORDINALITY w
                where date_trunc('month',tiem_register)=date_trunc('month',now()))
               select round((sum(watts)/1000)::numeric,2) as value from data;
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    costActualDay: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            select round(((sum(coalesce(w/360,0))/1000)*0.6387)::numeric,2) as value
            from tp_data_electric, unnest(watts) WITH ORDINALITY w
            where date_trunc('day',tiem_register)=date_trunc('day',now());
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    costActualMonth: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with data as (
                select w/360 as watts,tiem_register
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where date_trunc('month',tiem_register)=date_trunc('month',now())
                union all
                select w/360 as watts,tiem_register
                  from tp_data_electric_historic, unnest(watts) WITH ORDINALITY w
                where date_trunc('month',tiem_register)=date_trunc('month',now()))
               select round(((sum(watts)/1000)*0.6387)::numeric,2) as value from data;
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    }
}