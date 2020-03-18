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
    }
}