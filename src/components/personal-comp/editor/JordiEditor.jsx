import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Layout, theme, Button, Space, Input, Divider } from 'antd';
import { saveArticle } from '../../../service/storage-service';
import { useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;


const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const {
    token: { colorBgContainer },
} = theme.useToken();


  const config = {
    zIndex: 0,
    readonly: false,
 //   activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: false,
editorCssClass: false,
   triggerChangeEvent: true,
    height: 400,
//    direction: 'ltr',
    //language: 'en',
   // debugLanguage: false,
   // i18n: 'en',
 //   tabIndex: -1,
 //   toolbar: true,
//    enter: 'P',
 //   useSplitMode: false,
  //  colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
   // removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
 //   disablePlugins: ['paste', 'stat'],
   // events: {},
 //   textIcons: false,
    uploader: {
      insertImageAsBase64URI: true
    },
 //   placeholder: '',
 //   showXPathInStatusbar: false
  };
  useEffect(() => {
    debugger
    setTitle(location.state?.title);
    setContent(location.state?.content)

  }, []);
  async function publishPost() {
    
    alert(content)
 

}
async function savePost() {
    debugger
  saveArticle(title, content)


}
async function publishPost() {
    
  alert(content)


}
  return (
    <Layout>

    <Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer
        }}
    >
        <Input value={title} style={{textAlign: "center", fontSize: 24}} onChange={(e)=>setTitle(e.target.value)} placeholder='请输入标题' />

    <JoditEditor
      ref={editor}
      value={content}
      config={config}
//      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    //  onChange={e => setContent(e)}
    />
     </Content>
            <Footer>
                <Space wrap>
                    <Button type="primary" onClick={publishPost} >发表</Button>
                    <Button type="primary" onClick={savePost} >保存</Button>
                </Space>
            </Footer>
        </Layout>
  );
};
export default Example