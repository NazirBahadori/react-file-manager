import React from 'react'
import Dropzone from 'react-dropzone'

import Modal from '../../components/Modal'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

const CreateModal = ({ tabIndex: selectedTab, onModalClose, onModalSubmit }) => {
	const [fileName, setFileName] = React.useState(null)
	const [folderName, setFolderName] = React.useState(null)
	const [images, setImages] = React.useState([])
	const [type, setType] = React.useState('')
	const [tabIndex, setTabIndex] = React.useState(0)
	React.useEffect(() => {
		setTabIndex(selectedTab)
	}, [selectedTab])
	React.useEffect(() => {
		setFileName(null)
		setFolderName(null)
		setImages([])
	}, [tabIndex])
	const args = {
		value: type === 'file' ? fileName : type === 'folder' ? folderName : images,
		type,
	}
	const onDrop = files => setImages(images.concat(...files))
	return (
		<Modal>
			<Tabs index={tabIndex} onChange={index => setTabIndex(index)}>
				<TabList>
					<Tab>File</Tab>
					<Tab>Folder</Tab>
					<Tab>Image</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<label htmlFor="modal__input">File Name</label>
						<input
							type="text"
							name="createFolder"
							id="modal__input"
							value={fileName || ''}
							placeholder="Enter a file name"
							onChange={e => setFileName(e.target.value) || setType('file')}
						/>
					</TabPanel>
					<TabPanel>
						<label htmlFor="modal__input">Folder Name</label>
						<input
							type="text"
							name="createFolder"
							id="modal__input"
							value={folderName || ''}
							placeholder="Enter a folder name"
							onChange={e => setFolderName(e.target.value) || setType('folder')}
						/>
					</TabPanel>
					<TabPanel>
						<Dropzone onDrop={files => onDrop(files)}>
							{({ getRootProps, getInputProps }) => (
								<section id="dropzone">
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<p>Drag 'n' drop some files here, or click to select files</p>
									</div>
								</section>
							)}
						</Dropzone>
						<div id="images">
							{images &&
								images.length > 0 &&
								images.map(image => (
									<img src={URL.createObjectURL(image)} alt={image.name} key={image.name} />
								))}
						</div>
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Modal.Footer>
				<button onClick={() => onModalSubmit(args)}>Submit</button>
				<button onClick={() => onModalClose()}>Cancel</button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateModal