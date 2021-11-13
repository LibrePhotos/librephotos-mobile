import { ImageType } from '@/Components/ImageGrid'
import { store } from '@/Store'
import { updateGallery } from '@/Store/Gallery'
import api from '../index'
import fetchData, { ResponseType } from '../utils/fetchData'

export default (
  setData: React.Dispatch<React.SetStateAction<ResponseType>> = () => {},
): Promise<any> => {
  const request = api
    .get('/photos/notimestamp/list/', {
      timeout: 10000,
    })
    .then(response => {
      return response.data?.results || []
    })
    .then((results: ImageType[]) => {
      store.dispatch(updateGallery({ photosWithoutTimestamp: results }))
      return results
    })

  return fetchData(request, setData)
}
