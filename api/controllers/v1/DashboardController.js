module.exports = {
    lastWatt: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery('select *,watts/360 as watt from tp_last_electric;');
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
                select ordinality,round((coalesce(w/360,0))::numeric,4) as watt,to_char((tiem_register + ordinality * (interval '10 second'))-interval '10 second','HH24:MM:SS') as tiem_registro,id
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where tiem_register>= date_trunc('hour',now())-interval '3 hours'
                order by 4,1 asc)
                select array(select watt from rows) as watts ,array(select tiem_registro from rows) as times`);
            res.json(data.rows);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    }
}