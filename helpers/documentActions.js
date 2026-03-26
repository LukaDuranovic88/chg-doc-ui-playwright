const { DocumentStatus } = require('../test-data/enums/DocumentStatus');

// ─────────────────────────────────────────────────────────────
// Uploads a document without a prior request.
// Verifies required and optional metadata fields before submitting.
// ─────────────────────────────────────────────────────────────
async function uploadWithNoRequest(
  { homePage, uploadModal, categoryComponent },
  { category, contentType, subCategory, state, classification, signed, expectedStatus = DocumentStatus.Received }
) {
  await homePage.openUploadModal();
  await uploadModal.openCategory(category.displayName);

  if (contentType)    await uploadModal.selectContentType(contentType.displayName);
  if (classification) await uploadModal.selectClassification(classification);

  await uploadModal.uploadFile('test.pdf');

  if (subCategory) await uploadModal.selectSubCategory(subCategory);
  if (state)       await uploadModal.selectState(state.displayName);
  if (signed)      await uploadModal.selectSigned(signed);

  if (contentType) {
    await uploadModal.verifyRequiredFields({ subCategory, classification });
    await uploadModal.verifyOptionalFields(contentType.optional);
  }

  await uploadModal.submitAndClose();
  await categoryComponent.assertStatusAndCount(category.id, expectedStatus);
}

// ─────────────────────────────────────────────────────────────
// Makes a document request and verifies REQUESTED status.
// ─────────────────────────────────────────────────────────────
async function makeRequest(
  { homePage, requestModal, categoryComponent },
  { category, contentType, subCategory, state, classification, expectedStatus = DocumentStatus.Requested }
) {
  await homePage.openRequestModal();
  await requestModal.openCategory(category.displayName);

  if (contentType)    await requestModal.selectContentType(contentType.displayName);
  if (subCategory)    await requestModal.selectSubCategory(subCategory);
  if (classification) await requestModal.selectClassification(classification);
  if (state)          await requestModal.selectState(state.displayName);

  await requestModal.submitAndClose();
  await categoryComponent.assertStatusAndCount(category.id, expectedStatus);
}

// ─────────────────────────────────────────────────────────────
// Makes a request then uploads to it via the three dots menu.
// Asserts REQUESTED after step 1 and RECEIVED after step 2.
// ─────────────────────────────────────────────────────────────
async function uploadToRequest(
  { homePage, requestModal, uploadModal, categoryComponent },
  { category, contentType, subCategory, state, classification }
) {
  await homePage.openRequestModal();
  await requestModal.openCategory(category.displayName);

  if (contentType)    await requestModal.selectContentType(contentType.displayName);
  if (subCategory)    await requestModal.selectSubCategory(subCategory);
  if (classification) await requestModal.selectClassification(classification);
  if (state)          await requestModal.selectState(state.displayName);

  await requestModal.submitAndClose();
  await categoryComponent.assertStatusAndCount(category.id, DocumentStatus.Requested);

  await categoryComponent.clickUploadFromOptions(category.id);
  await uploadModal.uploadFile('test.pdf');
  await uploadModal.submitAndClose();

  await categoryComponent.assertStatusAndCount(category.id, DocumentStatus.Received);
}

module.exports = { uploadWithNoRequest, makeRequest, uploadToRequest };