# DocUI Home Page Test Plan

## Application Overview

DocUI is a comprehensive document management application for CHG Healthcare that allows users to request and upload various types of healthcare-related documents. The application features category-based organization, advanced table management, bulk operations, and detailed document tracking with status history.

## Test Scenarios

### 1. Document Request Workflow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Request a Single Content Type Document

**File:** `tests/document-requests/single-content-type-request.spec.ts`

**Steps:**
  1. Click the 'Request' button
    - expect: Request document modal opens
    - expect: Modal displays 'Request a Document' title
    - expect: All available document categories are displayed with icons
    - expect: Search box for content types is visible
  2. Click on the 'CV' category
    - expect: Navigate to document type selection page
    - expect: Document Type field shows 'CV' (disabled)
    - expect: Content Type dropdown shows 'Curriculum Vitae (Resume)' (pre-selected)
    - expect: Back and Submit buttons are available
  3. Click 'Submit' button
    - expect: Request is successfully submitted
    - expect: Confirmation screen shows 'Request Successful - Document Details'
    - expect: Provider Details table is displayed
    - expect: Document Metadata shows correct document and content type
    - expect: Document Details shows auto-generated Document ID
    - expect: Status History shows REQUESTED status with timestamp and user
    - expect: Close button is available
  4. Click 'Close' button
    - expect: Modal closes
    - expect: Return to home page
    - expect: CV category now shows count (1)
    - expect: Request button appears active/highlighted

#### 1.2. Request a Multi-Content Type Document

**File:** `tests/document-requests/multi-content-type-request.spec.ts`

**Steps:**
  1. Click the 'Request' button
    - expect: Request document modal opens with all categories displayed
  2. Click on 'Education, Training, Certifications' category
    - expect: Navigate to document type selection page
    - expect: Document Type field shows 'Education, Training, Certifications' (disabled)
    - expect: Content Type dropdown contains multiple options: Board Certification - Secondary, Child Abuse Certification, Continuing Medical Education (CME), Education and Training, Life Support and Misc. Certifications, Membership to Professional Society
  3. Select 'Continuing Medical Education (CME)' from the Content Type dropdown
    - expect: CME option is selected
    - expect: Submit button remains available
  4. Click 'Submit' button
    - expect: Request is submitted successfully
    - expect: Confirmation screen shows correct Content Type as 'Continuing Medical Education (CME)'
    - expect: Status History shows REQUESTED status

#### 1.3. Search Content Types During Request

**File:** `tests/document-requests/search-content-types.spec.ts`

**Steps:**
  1. Click the 'Request' button and type 'Financial' in the search box
    - expect: Only financial-related categories are displayed
    - expect: Non-matching categories are filtered out
  2. Clear the search and type 'License'
    - expect: Categories containing 'license' or 'licensing' are displayed
    - expect: Professional Licensure and Provider Hospital Privileging & Licensing categories are visible

#### 1.4. Navigate Back During Request Flow

**File:** `tests/document-requests/navigation-back.spec.ts`

**Steps:**
  1. Click 'Request' button, select any category, then click 'Back'
    - expect: Return to category selection page
    - expect: All categories are displayed again
    - expect: Previous selections are cleared
  2. Click 'Close' button (X)
    - expect: Modal closes completely
    - expect: Return to home page
    - expect: No request is submitted

### 2. Document Upload Workflow

**Seed:** `tests/seed.spec.ts`

#### 2.1. Upload to Fulfill Existing Request

**File:** `tests/document-uploads/fulfill-request-upload.spec.ts`

**Steps:**
  1. Ensure there's an existing request (create one if needed), then click 'Upload' button
    - expect: Upload modal opens with title 'Upload a Document'
    - expect: Additional categories are available compared to Request modal
    - expect: Categories include: Contracts, Housing & Travel, Job and Assignment, Pay Stubs, Document Support Line
  2. Click on a category that has existing requests (e.g., CV)
    - expect: Available Requests section appears
    - expect: Shows count of available requests
    - expect: Search box for filtering requests
    - expect: Table displays existing requests with: Content Type, Requested By, Requested Date, Upload button
  3. Click 'Upload' button for a specific request
    - expect: Navigate to upload form
    - expect: Document Type is disabled and pre-filled
    - expect: Content Type is disabled and matches the request
    - expect: Upload File drag & drop area is displayed
    - expect: Optional Info section is available
    - expect: Description field is provided
    - expect: Back and Submit buttons are present
  4. Expand Optional Info section
    - expect: Description field becomes visible
    - expect: Optional information can be entered

#### 2.2. Upload Unrequested Document

**File:** `tests/document-uploads/unrequested-upload.spec.ts`

**Steps:**
  1. Click 'Upload' button and select a category
    - expect: Available Requests section is displayed
    - expect: 'Upload a document that wasn't requested' button is available
  2. Click 'Upload a document that wasn't requested'
    - expect: Navigate to upload form
    - expect: Document Type is disabled with selected category
    - expect: Content Type dropdown is enabled with available options
  3. Select a Content Type from the dropdown
    - expect: Upload File section appears
    - expect: Drag & drop area is displayed
    - expect: Optional Info section is available
    - expect: Submit button is enabled

#### 2.3. Upload File Interaction

**File:** `tests/document-uploads/file-upload-interaction.spec.ts`

**Steps:**
  1. Navigate to upload form and interact with file upload area
    - expect: Drag & drop area responds to hover
    - expect: Browse button is clickable
    - expect: File dialog opens when browse is clicked
  2. Add description in Optional Info section
    - expect: Description field accepts text input
    - expect: Character limit (if any) is enforced
    - expect: Text is preserved during form navigation

### 3. Document Table Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. View and Navigate Document Categories

**File:** `tests/document-table/category-navigation.spec.ts`

**Steps:**
  1. Observe the default home page state
    - expect: Categories are displayed as collapsible cards
    - expect: Each category shows document count in parentheses
    - expect: Expandable arrow icon (caret down) is visible
    - expect: Each category has its own search box and refresh button
  2. Click on a category to expand it
    - expect: Category expands to show document table
    - expect: Table displays relevant columns for that document type
    - expect: Archived section appears below the main table
  3. Expand multiple categories simultaneously
    - expect: Multiple categories can be open at the same time
    - expect: Each maintains its own table and functionality
    - expect: No interference between categories

#### 3.2. Document Table Column Display

**File:** `tests/document-table/column-display.spec.ts`

**Steps:**
  1. Expand CV category and examine table columns
    - expect: CV table shows columns: Select, Content Type, Description, Request Date, Uploaded Date, Status, Options
    - expect: Columns are specific to CV document type requirements
  2. Expand Education, Training, Certifications category and examine table columns
    - expect: Education table shows additional columns: Sub-Category, Specialty, Expiration Date, Date To
    - expect: More comprehensive column set than CV category
    - expect: Column headers are sortable (indicated by 'Click to sort' text)
  3. Compare different category table structures
    - expect: Different categories show different relevant columns
    - expect: Column structure matches document type requirements
    - expect: All tables maintain core columns: Select, Content Type, Status, Options

#### 3.3. Table Sorting Functionality

**File:** `tests/document-table/sorting.spec.ts`

**Steps:**
  1. Click on 'Content Type' column header
    - expect: Column header becomes active
    - expect: Sort indicator changes to 'Click to sort descending'
    - expect: Table data is sorted in ascending order by Content Type
  2. Click the same column header again
    - expect: Sort order reverses to descending
    - expect: Sort indicator changes to 'Click to sort ascending'
    - expect: Table data is re-sorted in descending order
  3. Click on different column headers (Request Date, Status, etc.)
    - expect: Each column becomes sortable
    - expect: Only one column maintains active sort at a time
    - expect: Data sorts appropriately based on column type (dates, text, status)
  4. Click 'Click to clear sorting' option
    - expect: Sorting is removed
    - expect: Table returns to default order
    - expect: No column headers show active state

#### 3.4. Document Search and Filtering

**File:** `tests/document-table/search-filtering.spec.ts`

**Steps:**
  1. Type in the search box within a category
    - expect: Search text appears in the search box
    - expect: Table filters in real-time as text is typed
    - expect: Only matching documents are displayed
  2. Search for partial matches (e.g., 'CME' for 'Continuing Medical Education')
    - expect: Partial text matches are found
    - expect: Search is case-insensitive
    - expect: Results update dynamically
  3. Search for non-existent terms
    - expect: No results are displayed
    - expect: Table shows empty state or no rows
    - expect: Search functionality continues to work
  4. Clear the search box
    - expect: All documents reappear
    - expect: Filter is removed
    - expect: Original table state is restored

#### 3.5. Refresh Category Data

**File:** `tests/document-table/refresh-functionality.spec.ts`

**Steps:**
  1. Click the refresh button (arrow repeat icon) for a category
    - expect: Refresh action is triggered
    - expect: Category data is reloaded
    - expect: Any new or updated documents appear
    - expect: Current view state is maintained
  2. Refresh while search filter is active
    - expect: Data refreshes and filter remains applied
    - expect: Search term stays in the search box
    - expect: Only filtered results are shown after refresh

### 4. Document Row Actions

**Seed:** `tests/seed.spec.ts`

#### 4.1. Access Document Options Menu

**File:** `tests/document-actions/options-menu.spec.ts`

**Steps:**
  1. Click the three-dots options button for any document row
    - expect: Context menu opens
    - expect: Menu contains: Document details, Upload (for requests), Request Again, Delete Request
    - expect: Menu items have appropriate icons
    - expect: Menu appears positioned near the clicked button
  2. Click outside the menu or on another area
    - expect: Options menu closes
    - expect: No actions are performed
    - expect: Menu can be reopened by clicking the options button again

#### 4.2. View Document Details

**File:** `tests/document-actions/document-details.spec.ts`

**Steps:**
  1. Click 'Document details' from the options menu
    - expect: Document Details modal opens
    - expect: Modal shows sections: Provider Details, Document Metadata, Document Details, Status History
    - expect: Provider details include Name and JDE# (may be blank in test)
    - expect: Document Metadata shows Document Type, Content Type, Issue Date, Description
    - expect: Document Details shows File Name, Document ID, Upload Source, Archived status
    - expect: Status History shows timestamped status changes with user information
    - expect: Close button is present
  2. Review all information sections
    - expect: All relevant metadata is displayed
    - expect: Document ID is auto-generated and unique
    - expect: Status history provides complete audit trail
    - expect: Data formatting is consistent and readable
  3. Click 'Close' button
    - expect: Modal closes
    - expect: Return to document table
    - expect: No changes are made to the document

#### 4.3. Upload from Row Actions

**File:** `tests/document-actions/upload-from-row.spec.ts`

**Steps:**
  1. Click 'Upload' from options menu for a requested document
    - expect: Upload form opens
    - expect: Document Type and Content Type are pre-filled and disabled
    - expect: Same upload interface as accessing through Upload button
    - expect: Form is specifically tied to the selected request

#### 4.4. Request Again Functionality

**File:** `tests/document-actions/request-again.spec.ts`

**Steps:**
  1. Click 'Request Again' from options menu
    - expect: New request is initiated
    - expect: Request form opens with same document type
    - expect: New document entry is created
    - expect: Original request remains unchanged

#### 4.5. Delete Request

**File:** `tests/document-actions/delete-request.spec.ts`

**Steps:**
  1. Click 'Delete Request' from options menu
    - expect: Confirmation dialog appears (if implemented)
    - expect: Request is removed from the table
    - expect: Document count in category decreases
    - expect: Action cannot be undone

### 5. Bulk Operations

**Seed:** `tests/seed.spec.ts`

#### 5.1. Document Selection

**File:** `tests/bulk-operations/document-selection.spec.ts`

**Steps:**
  1. Click checkboxes in the Select column for multiple documents
    - expect: Checkboxes become checked/selected
    - expect: Multiple documents can be selected simultaneously
    - expect: Visual indication of selected state
  2. Select all documents in a category (if select-all functionality exists)
    - expect: All documents in the current view are selected
    - expect: Select-all state is indicated
    - expect: Individual checkboxes reflect the selection
  3. Deselect individual documents
    - expect: Individual documents become unselected
    - expect: Bulk selection state updates accordingly
    - expect: Other selected documents remain selected

#### 5.2. Bulk Actions Interface

**File:** `tests/bulk-operations/bulk-actions-ui.spec.ts`

**Steps:**
  1. Select one or more documents and look for bulk action controls
    - expect: Bulk action toolbar appears (if implemented)
    - expect: Available actions may include: Download, Archive, Delete, Export
    - expect: Action buttons are enabled only when documents are selected
  2. Change selection and observe bulk action availability
    - expect: Bulk actions update based on current selection
    - expect: Some actions may be context-dependent (e.g., only for uploaded documents)
    - expect: Clear indication of how many documents are selected

### 6. Archived Documents

**Seed:** `tests/seed.spec.ts`

#### 6.1. Access Archived Documents

**File:** `tests/archived-documents/access-archived.spec.ts`

**Steps:**
  1. Expand a category and click on 'Archived (0)' section
    - expect: Archived documents table expands
    - expect: Shows same column structure as main documents table
    - expect: Displays message 'There are currently no archived documents for this category' when empty
    - expect: Table headers are present and functional
  2. Navigate between active and archived sections
    - expect: Both sections can be expanded simultaneously
    - expect: Each maintains independent state
    - expect: Archive count updates when documents are archived

#### 6.2. Archive Document Workflow

**File:** `tests/archived-documents/archive-workflow.spec.ts`

**Steps:**
  1. Archive a document (through bulk actions or individual action)
    - expect: Document moves from main table to archived section
    - expect: Archive count increases
    - expect: Main document count decreases
    - expect: Document retains all metadata in archived state
  2. View archived document details
    - expect: Archived documents have same detail view as active documents
    - expect: Status history includes archive action
    - expect: All original information is preserved

### 7. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 7.1. Network Connectivity

**File:** `tests/edge-cases/network-errors.spec.ts`

**Steps:**
  1. Simulate network interruption during request submission
    - expect: Appropriate error message is displayed
    - expect: User is informed of the failure
    - expect: Form data is preserved for retry
  2. Refresh page during document operations
    - expect: Page reloads gracefully
    - expect: Current state is restored from server
    - expect: No data corruption occurs

#### 7.2. Large Dataset Handling

**File:** `tests/edge-cases/large-datasets.spec.ts`

**Steps:**
  1. Navigate to categories with many documents
    - expect: Table performance remains acceptable
    - expect: Pagination appears if needed
    - expect: Search and sort remain responsive
  2. Perform search on large dataset
    - expect: Search results appear quickly
    - expect: Result count is accurate
    - expect: Filter performance is acceptable

#### 7.3. Session Management

**File:** `tests/edge-cases/session-handling.spec.ts`

**Steps:**
  1. Leave application idle for extended period
    - expect: Session timeout handling is graceful
    - expect: User is redirected to login if session expired
    - expect: Appropriate warning messages appear
  2. Open application in multiple tabs
    - expect: Multiple sessions work independently
    - expect: Data synchronization occurs across tabs (if implemented)
    - expect: No conflicts between tabs

#### 7.4. Invalid File Uploads

**File:** `tests/edge-cases/invalid-uploads.spec.ts`

**Steps:**
  1. Attempt to upload unsupported file types
    - expect: Validation error messages appear
    - expect: Upload is prevented
    - expect: Supported file types are clearly indicated
  2. Attempt to upload oversized files
    - expect: File size validation triggers
    - expect: Clear error message about size limits
    - expect: Upload progress is handled appropriately

### 8. User Interface and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. Responsive Design

**File:** `tests/ui-accessibility/responsive-design.spec.ts`

**Steps:**
  1. Access application on different screen sizes
    - expect: Tables adapt to smaller screens
    - expect: Buttons and controls remain accessible
    - expect: Text remains readable
    - expect: Horizontal scrolling is provided where needed
  2. Test mobile navigation
    - expect: Touch targets are appropriately sized
    - expect: Gestures work as expected
    - expect: Modal dialogs fit mobile screens

#### 8.2. Loading States and Feedback

**File:** `tests/ui-accessibility/loading-states.spec.ts`

**Steps:**
  1. Observe application behavior during loading operations
    - expect: Loading indicators appear during operations
    - expect: User receives feedback for all actions
    - expect: Submit buttons are disabled during processing
    - expect: Progress indication for file uploads
  2. Test form validation feedback
    - expect: Required fields are clearly marked
    - expect: Validation errors are helpful and specific
    - expect: Success messages appear after successful operations
