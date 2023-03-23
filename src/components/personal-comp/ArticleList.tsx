import { useEffect, useState } from "react"
import { Table} from 'antd'

function ArticleList() {
    const [articles, setArticles] = useState<any[]>([])
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            ellipsis: true
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 500,
            render: (text: string) => <a href="javascript: void(0)" target="_self" >{text}</a>
        },
        {
            title: '内容',
            dataIndex: 'content'
        },
    ]
    useEffect(() => {
        loadArticles();

    }, []);

    const loadArticles = async () => {
        debugger
        
        setArticles([])
        console.log("mounted!")
    }

    return (

        <div>


            <Table
                onRow={record => {
                    return {
                        onClick: event => { console.log(record) }, // 点击行
                        onDoubleClick: event => { },
                        onContextMenu: event => { },
                        onMouseEnter: event => { }, // 鼠标移入行
                        onMouseLeave: event => { },
                    };
                }}

                columns={columns}
                dataSource={articles}

                bordered
            >
            </Table>
        </div>
    )
}
export default ArticleList