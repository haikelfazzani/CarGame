import React from 'react';
import { Link } from 'react-router-dom';
import BitbucketSnippetService from '../../services/BitbucketSnippetService';

function Snippets({ snippets }) {

  const onDelete = async (snippet) => {
    if (window.confirm("Are you sure to delete? " + snippet.title)) {
      let resp = await BitbucketSnippetService.delete(snippet);
      if (resp) window.location.reload();
    }
  }

  const onGetComments = async (snippet) => {
    let resp = await BitbucketSnippetService.getListComments(snippet.id);
  }

  if (snippets && snippets.length > 0) {
    return (<div className='w-100'>
      <h2 className='border-bottom pb-3'>Your Snippets ({snippets.length})</h2>
      <ul className='h-100 grid-3 overflow'>
        {snippets.reverse().map((snip, i) => <li className='border shadow fit-content p-3' key={snip.id}>
          <div>
            <h2 className='text-center mt-0'><i className="fa fa-file-code mr-1"></i>{snip.title}</h2>
            <small>created on: {new Date(snip.created_on).toDateString()}</small>
            <br />
            <small>updated on: {new Date(snip.updated_on).toDateString()}</small>
          </div>

          <div className='w-100 d-flex justify-center mt-3'>
            <Link to={"/playground?s=" + snip.id} className="btn bg-green mr-2">
              <i className="fas fa-edit mr-1"></i>Update
            </Link>

            <button onClick={() => { onDelete(snip); }} className="btn bg-danger">
              <i className="fas fa-trash mr-1"></i>delete
            </button>

            {/* <button onClick={() => { onGetComments(snip); }} className="btn bg-danger">
              <i className="fas fa-trash mr-1"></i>get
            </button> */}
          </div>
        </li>)}
      </ul>
    </div>);
  }
  else {
    return <p className='p-3'><i className='fa fa-info-circle mr-1'></i>No snippets are found..</p>
  }
}

export default React.memo(Snippets)