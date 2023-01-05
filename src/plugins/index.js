import ElementPlus from 'element-plus'


let plugins = [
    ElementPlus
]

export default function getElementUI(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}

