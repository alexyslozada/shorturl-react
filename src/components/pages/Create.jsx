import { useState } from "react"
import Axios from "axios"

import ShortURL from "../elements/ShortURL"
import { API_URL } from "../../config/configuration"

const PATH = "/v1/short-urls"

const Create = () => {
  const [shortURL, setShortURL] = useState({})
  const [canSetOwnShort, setCanSetOwnShort] = useState(false)

  const setOwnShort = e => {
    setCanSetOwnShort(!e.target.checked)
  }

  const clearForm = form => {
    form.reset()
    setCanSetOwnShort(false)
  }

  const submit = e => {
    e.preventDefault()

    const form = e.target
    const short = {
      is_random: form.is_random.checked,
      short: form.short?.value,
      redirect_to: "https://"+form.redirect_to.value,
      description: form.description.value
    }

    Axios.post(`${API_URL}${PATH}`, short)
    .then((response) => {
      setShortURL(response.data.data)
      clearForm(form)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Short URL</h3>
            <p class="mt-1 text-sm text-gray-600">Create your own short URL and track it.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={submit}>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input type="checkbox" name="is_random" id="is_random" defaultChecked onChange={setOwnShort} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label htmlFor="is_random" className="font-medium text-gray-700">Is Random?</label>
                    <p class="text-gray-500">If it is not selected, then you can put your own path.</p>
                  </div>
                </div>


              { canSetOwnShort &&
                <div class="col-span-6 sm:col-span-3">
                  <label htmlFor="short" className="block text-sm font-medium text-gray-700">Specific short:</label>
                  <input type="text" name="short" id="short" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              }

                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label htmlFor="redirect_to" className="block text-sm font-medium text-gray-700">Redirect to:</label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> https:// </span>
                      <input type="text" name="redirect_to" id="redirect_to" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="ed.team" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <div class="mt-1">
                    <textarea name="description" id="description" cols="30" rows="10" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Your description here" />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Brief description for your URL.</p>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
                </div>
              </div>
            </div>
          </form>
            {
                shortURL && <ShortURL short={shortURL} />
            }
        </div>
      </div>
    </div>
  );
};

export default Create;
