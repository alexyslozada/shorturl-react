import { useState } from "react"

import ShortURL from "../elements/ShortURL"
import useShortURL from "../../hooks/useShorturl"

const Create = () => {
  const [shortURL, setShortURL] = useState({})
  const [canSetOwnShort, setCanSetOwnShort] = useState(false)

  const setOwnShort = (e) => {
    setCanSetOwnShort(!e.target.checked)
  }

  const clearForm = (form) => {
    form.reset()
    setCanSetOwnShort(false)
  }

  // sanitizeRedirectTo removes the http:// or https://
  const sanitizeRedirectTo = (redirect) => {
    const regex = /http[s]?:\/\//
    return redirect.replace(regex, "")
  }

  const { createShortURL, deleteShortURL } = useShortURL()
  const wrapDelShortURL = async (id) => {
    const resp = await deleteShortURL(id)
    if (resp.status !== 204) {
      console.log("Ups! no pudimos borrar", resp.status, resp.data)
      return
    }

    setShortURL({})
  }

  const submit = async (e) => {
    e.preventDefault()

    const form = e.target
    const short = {
      is_random: form.is_random.checked,
      short: form.short?.value,
      redirect_to: `https://${sanitizeRedirectTo(form.redirect_to.value)}`,
      description: form.description.value,
    }

    const resp = await createShortURL(short)
    if (resp.status !== 201) {
      console.log("Ups! we can't create", resp.status, resp.data)
      return
    }

    setShortURL(resp.data)
    clearForm(form)
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Short URL</h3>
            <p className="mt-1 text-sm text-gray-600">Create your own short URL and track it.</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={submit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input type="checkbox" name="is_random" id="is_random" defaultChecked onChange={setOwnShort} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="is_random" className="font-medium text-gray-700">Is Random?</label>
                    <p className="text-gray-500">If it is not selected, then you can put your own path.</p>
                  </div>
                </div>

                { canSetOwnShort
                && (
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="short" className="block text-sm font-medium text-gray-700">Specific short:</label>
                  <input type="text" name="short" id="short" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                )}

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="redirect_to" className="block text-sm font-medium text-gray-700">Redirect to:</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> https:// </span>
                      <input type="text" name="redirect_to" id="redirect_to" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="ed.team" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="mt-1">
                    <textarea name="description" id="description" cols="30" rows="10" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Your description here" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Brief description for your URL.</p>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
                </div>
              </div>
            </div>
          </form>
          { shortURL && <ShortURL short={shortURL} delShortURL={() => wrapDelShortURL(shortURL.id)} /> }
        </div>
      </div>
    </div>
  );
};

export default Create;
