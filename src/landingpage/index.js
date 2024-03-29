import React from 'react';
import Typography from '@material-ui/core/Typography';
import './index.scss';
import { TextField, Paper, Grid, Button} from '@material-ui/core';
import 'antd/dist/antd.css';
import { Upload, Icon, Modal } from 'antd';
import {
  Redirect
} from 'react-router-dom';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { 
      someKey: 'someValue',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      name: "",
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  }

  onChange = (event) => {
    if (event.target.value === null || event.target.value === undefined)
      return
    this.setState({ name: event.target.value });
  }

  handleSubmit = () => {
    //This is called when you click submit
    this.props.handleSubmit(this.state.fileList);
    
    this.setState({redirect: true});
  }

  renderRedirect = () => {
    if(this.state.redirect)return <Redirect to="/result" />
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <span>
        {this.renderRedirect()}
        <Typography className="title" component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
          Hi, Welcome to Pikasso!
        </Typography>
        <Typography className="subtitle" component="h2" variant="h6" align="center" color="textPrimary" gutterBottom >
          Pic Associations and find others with common interests using machine learning
        </Typography>
        <div className="main-content">
          <Paper className="info-left">
            <Grid container spacing={2} direction="column" >
              <Grid item className="instructions">
                <div>
                  <span style={{ fontWeight: 'bold' }}>HOW IT WORKS</span> <br/>
                  Upload one or more pictures of a space that contains personal items which mean a lot to you. They may be taken from different angles and we’ll match you with other people that we believe share similar interests using an algorithm. <br/>
                  Enter your name and click Submit to see your results!
                </div>
              </Grid>
              <Grid item className="input">
                <TextField
                  onChange={this.onChange}
                  label="Name"
                  className="name"
                  name="Name"
                  autoComplete="Name"
                  margin="normal"
                  variant="filled"
                />
                <div className="submit-button">
                  <Button variant="contained" size={"large"} disabled={this.state.fileList.length === 0} onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <div className="column-right">
            <div className="gallery">
              <div className="clearfix">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </span>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Landing;
