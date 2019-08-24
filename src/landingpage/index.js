import React from 'react';
import Typography from '@material-ui/core/Typography';
import './index.scss';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class Landing extends React.Component {
  constructor() {
    super();
    this.state = { 
      someKey: 'someValue',
      previewVisible: false,
      previewImage: '',
      files: [],
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  }

  render() {
    const { previewVisible, previewImage, files } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <span>
        <Typography className="title" component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
          Hi, welcome to Pikasso!
        </Typography>
        <Typography className="subtitle" component="h2" variant="h6" align="center" color="textPrimary" gutterBottom >
          Pick Associations and find others with common interests using machine learning
        </Typography>
        <div className="main-content">
          <Paper className="info-left">
            <Grid container spacing={2} direction="column" >
              <Grid item className="instructions">
                <div>
                  <span style={{ fontWeight: 'bold' }}>Instructions</span> <br/>
                  Do this stuff and then do other stuff and more stuf and more stuff and more stuff AND DO MORE STUFF
                </div>
              </Grid>
              <Grid item className="input">
                <TextField
                  label="Name"
                  className="name"
                  type="email"
                  name="Name"
                  autoComplete="Name"
                  margin="normal"
                  variant="filled"
                />
              </Grid>
            </Grid>
          </Paper>
          <div className="column-right">
          <div className="gallery">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              accept="image/*"
              action="http://www.mocky.io/v2/5d6155953200004d008e60a6"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
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
