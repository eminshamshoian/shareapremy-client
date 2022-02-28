import { Select, Button } from "antd";

const { Option } = Select;

const CollectionCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
}) => {
  const children = [];
  for (let i = 9.99; i <= 1000; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group pb-4'>
        <input
          type='text'
          name='name'
          className='form-control'
          placeholder='Collection Name'
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className='form-group pb-4'>
        <textarea
          name='description'
          cols='7'
          placeholder='Collection Description'
          rows='7'
          value={values.description}
          className='form-control'
          onChange={handleChange}
        ></textarea>
      </div>
      <div className='form-group pb-4'>
        <input
          type='text'
          name='category'
          className='form-control'
          placeholder='Collection Category'
          value={values.category}
          onChange={handleChange}
        />
      </div>
      <div className='form-row'>
        <div className='col'>
          <div className='form-group pb-4'>
            <Select
              style={{ width: "100%" }}
              size='large'
              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: !values.paid })}
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
        </div>

        {values.paid && (
          <div className='form-group pb-4'>
            <Select
              defaultValue='$9.99'
              style={{ widht: "100%" }}
              onChange={(v) => setValues({ ...values, price: v })}
              tokenSeparators={[,]}
              size='large'
            >
              {children}
            </Select>
          </div>
        )}
      </div>

      <div className='form-row pb-4'>
        <div className='col'>
          <div className='form-group'>
            <label className='btn btn-outline-secondary btn-block text-left'>
              {values.loading ? "Uploading" : "Upload Thumbnail"}
              <input
                type='file'
                name='image'
                onChange={handleImage}
                accept='image/*'
                hidden
              />
            </label>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className='mb-3 long-btn'
            loading={values.loading}
            type='primary'
            size='large'
            shape='round'
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CollectionCreateForm;
