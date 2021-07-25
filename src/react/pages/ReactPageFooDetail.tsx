import { Link, useParams } from 'react-router-dom';

export default function ReactPageFooDetail() {
  const id = Number(useParams().id);

  return (
    <>
      <div>ReactPageFooDetail, id ={id}</div>
      <Link to="..">go to parent</Link>
    </>
  );
}
