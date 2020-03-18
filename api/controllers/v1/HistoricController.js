module.exports = {
    kwhDayDetail: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with data as (
                select w/360 as watts,tiem_register
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours'
                union all
                select w/360 as watts,tiem_register
                  from tp_data_electric_historic, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours'),
                result as
                  (select extract (hour from tiem_register) as category,round((sum(watts)/1000)::numeric,2) as series from data group by  tiem_register order by 1 asc)
              select array_agg(category) as category,array_agg(series) as series,max(series) as max from result;
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },
    kwhDayTotal: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with data as (
                select w/360 as watts,tiem_register
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours'
                union all
                select w/360 as watts,tiem_register
                  from tp_data_electric_historic, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours')
               select round((sum(watts)/1000)::numeric,2) as value from data;
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    },

    costDayTotal: async function (req,res){
        try {
            let data = await Vista.getDatastore().sendNativeQuery(`
            with data as (
                select w/360 as watts,tiem_register
                  from tp_data_electric, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours'
                union all
                select w/360 as watts,tiem_register
                  from tp_data_electric_historic, unnest(watts) WITH ORDINALITY w
                where tiem_register between  '${req.param('daySelect')} 00:00:00'::timestamp and '${req.param('daySelect')} 00:00:00'::timestamp + interval '23 hours')
               select round(((sum(watts)/1000)*0.6387)::numeric,2) as value from data;
            `);
            res.json(data.rows[0]);
        } catch (error) {
            res.status(500);
            res.send('Error al obtener la data');
        }
    }

}