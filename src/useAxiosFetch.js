/* Give this a read if you want to learn how to cancel axios request before unmouting a component 
https://stackoverflow.com/questions/62533417/correct-way-to-cancel-async-axios-request-in-a-react-functional-component
https://github.com/axios/axios#cancellation/
*/

import { useEffect } from "react";
import axios from "axios";

function useAxiosFetch(options, { onFetch, onError, onCancel }) {
  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    axios({
      ...options,
      cancelToken: source.token,
    })
      .then((response) => {
        if (isMounted) onFetch(response);
      })
      .catch((error) => {
        if (!isMounted) return;

        if (axios.isCancel(error)) {
          onCancel(error);
        } else {
          onError(error);
        }
      });
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [options, onFetch, onError, onCancel]);
}

export default useAxiosFetch;
