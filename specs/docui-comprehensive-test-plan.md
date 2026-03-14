# DocUI Document Management Test Plan

## Application Overview

DocUI is a comprehensive document management system for healthcare providers within CHG Healthcare. It enables users to request specific document types, upload documents to fulfill requests, and manage document lifecycle through various statuses. The application supports 13+ main document categories with 100+ specific content types covering everything from CV/Resume to Professional Licensing, Education, Health Records, and Travel documentation. Key functionality includes modal-based request/upload workflows, advanced search/filtering capabilities, document status tracking, and integration with CHG's Okta authentication system.

## Test Scenarios

### 1. Document Request Workflow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Request CV Document - Happy Path

**File:** `tests/request-workflow/request-cv-happy-path.spec.ts`

**Steps:**
  1. Navigate to DocUI application homepage
    - expect: Page loads with Request and Upload buttons visible
    - expect: Page title shows 'CHG Documents'
    - expect: Message displays 'No documents currently exist for this user' (for clean state)
  2. Click Request button
    - expect: Request modal opens
    - expect: Modal title shows 'Request a Document'
    - expect: Content type grid displays with icons and categories
    - expect: Search box is visible at top
    - expect: Close button is present
  3. Click CV content type category
    - expect: Form displays with Document Type: CV (disabled)
    - expect: Content Type dropdown shows 'Curriculum Vitae (Resume)' as selected
    - expect: Back and Submit buttons are visible
  4. Click Submit button
    - expect: Success modal displays with 'Request Successful - Document Details'
    - expect: Provider Details table shown (may be empty)
    - expect: Document Metadata shows Document Type: CV, Content Type: Curriculum Vitae (Resume)
    - expect: Document ID is generated and displayed
    - expect: Status History shows REQUESTED status with timestamp and requester email
  5. Click Close button on success modal
    - expect: Return to homepage
    - expect: CV (1) section is now visible
    - expect: Document appears in table with columns: Select, Content Type, Description, Request Date, Uploaded Date, Status, Options
    - expect: Status shows 'REQUESTED'

#### 1.2. Request Education Document with Search

**File:** `tests/request-workflow/request-education-search.spec.ts`

**Steps:**
  1. Click Request button and search for 'Education' in search box
    - expect: Content types filter to show Education, Training, Certifications category
    - expect: Other categories are hidden/filtered out
  2. Click Education, Training, Certifications category
    - expect: Content Type dropdown shows multiple options: Board Certification - Secondary, Child Abuse Certification, Continuing Medical Education (CME), Education and Training, Education and Training Support Documents, Life Support and Misc. Certifications, Membership to Professional Society
  3. Select 'Continuing Medical Education (CME)' from dropdown
    - expect: Content Type dropdown shows selected value
    - expect: Submit button becomes enabled
  4. Submit the request
    - expect: Request successful modal displays
    - expect: Document Type shows 'Education, Training, Certifications'
    - expect: Content Type shows 'Continuing Medical Education (CME)'
    - expect: New Document ID is generated

#### 1.3. Request All Content Type Categories

**File:** `tests/request-workflow/request-all-categories.spec.ts`

**Steps:**
  1. For each content category: CV, Education Training Certifications, Financial & Tax, Health Records Employment Screening, Professional Liability, Professional Licensure, Proof of Identity, Provider Hospital Privileging Licensing, Provider Internal Credentialing, Work Gap Military History - request a document
    - expect: Each category opens with appropriate content type options
    - expect: Document requests complete successfully
    - expect: Document IDs are generated for each
    - expect: All requests appear in the document list with REQUESTED status

### 2. Document Upload Workflow

**Seed:** `tests/seed.spec.ts`

#### 2.1. Upload for Existing Request - Happy Path

**File:** `tests/upload-workflow/upload-existing-request.spec.ts`

**Steps:**
  1. Create a CV document request first (prerequisite)
    - expect: CV request exists with REQUESTED status
  2. Click Upload button
    - expect: Upload modal opens
    - expect: Content type categories displayed
    - expect: Additional categories visible including: Contracts, Housing & Travel, Job and Assignment, Pay Stubs, Document Support Line
  3. Click CV category
    - expect: Shows Available Requests (1) section
    - expect: Displays the previously created CV request with details: Content Type, Requested By, Requested Date
    - expect: Upload button present for the specific request
    - expect: Search box available for filtering requests
  4. Click Upload button for the specific request
    - expect: Upload form displays
    - expect: Document Type: CV (disabled)
    - expect: Content Type dropdown with options: Curriculum Vitae (Resume), CV Support Documents
    - expect: Upload File section with drag & drop interface
    - expect: OPTIONAL INFO section with Description field
    - expect: Back and Submit buttons present
  5. Test file upload interface (without actual file)
    - expect: Upload area accepts drag and drop
    - expect: Browse button is clickable
    - expect: Optional description field accepts text input
  6. Add description 'Updated CV for 2026' and click Submit
    - expect: Upload completes successfully
    - expect: Document status updates appropriately
    - expect: File metadata is captured

#### 2.2. Upload Document Not Requested

**File:** `tests/upload-workflow/upload-unrequested-document.spec.ts`

**Steps:**
  1. Navigate to Upload modal and select CV category
    - expect: Available Requests section shows existing requests
    - expect: 'Upload a document that wasn't requested' button is visible
  2. Click 'Upload a document that wasn't requested' button
    - expect: Form displays with Document Type: CV
    - expect: Content Type dropdown available
    - expect: Submit button present
  3. Select 'CV Support Documents' from Content Type dropdown
    - expect: Upload File section appears immediately
    - expect: OPTIONAL INFO section with Description field
    - expect: Drag & drop interface is functional
  4. Complete upload form and submit
    - expect: Document uploads successfully
    - expect: New document appears in document list
    - expect: Status reflects unrequested upload

#### 2.3. Upload Content Type Search and Filter

**File:** `tests/upload-workflow/upload-search-filter.spec.ts`

**Steps:**
  1. Open Upload modal and test search functionality with 'Professional'
    - expect: Results filter to show Professional Liability, Professional Licensure, and related categories
    - expect: Non-matching categories are hidden
  2. Clear search and verify all categories return
    - expect: All 13+ content categories visible again
    - expect: Categories include: Contracts, CV, Education Training Certifications, Financial & Tax, Health Records Employment Screening, Housing & Travel, Job Assignment, Pay Stubs, Professional Liability, Professional Licensure, Proof of Identity, Provider Hospital Privileging Licensing, Provider Internal Credentialing, Work Gap Military History, Document Support Line
  3. Test search with various terms: 'Health', 'License', 'Financial'
    - expect: Each search returns appropriate filtered results
    - expect: Search appears to be partial match and may include subcategory matches

### 3. Document Management and Views

**Seed:** `tests/seed.spec.ts`

#### 3.1. Document Table Functionality

**File:** `tests/document-management/document-table.spec.ts`

**Steps:**
  1. Create multiple document requests of different types to populate the table
    - expect: Documents appear in expandable category sections
    - expect: Each category shows count e.g. 'CV (1)'
  2. Search for documents using main page search box
    - expect: Search reveals detailed table with columns: Select, Content Type, Description, Request Date, Uploaded Date, Status, Options
    - expect: Table shows sortable column headers
    - expect: Search filters results appropriately
  3. Test table sorting by clicking column headers
    - expect: Content Type column sorts ascending/descending
    - expect: Request Date column sorts chronologically
    - expect: Status column groups by status types
    - expect: Sort indicators display (ascending/descending arrows)
  4. Test document selection using checkboxes
    - expect: Multiple documents can be selected
    - expect: Select all functionality works
    - expect: Selected state is maintained during sorting
  5. Click refresh button
    - expect: Table data reloads
    - expect: Current view state is maintained
    - expect: Any new documents appear

#### 3.2. Document Actions Menu

**File:** `tests/document-management/document-actions.spec.ts`

**Steps:**
  1. Create a document request and click three-dots menu
    - expect: Actions menu displays with options: Document details, Upload, Request Again, Delete Request
    - expect: Each menu item has appropriate icon
  2. Click 'Document details' menu item
    - expect: Document Details modal opens
    - expect: Provider Details table shown
    - expect: Document Metadata displays: Document Type, Content Type, Description
    - expect: Document Details shows: File Name, Document ID, Upload Source, Archived status
    - expect: Status History table with timestamp, status, and user email
  3. Click 'Upload' menu item
    - expect: Navigates to upload form for specific document
    - expect: Pre-populated with document type and content type
    - expect: Upload interface immediately available
  4. Click 'Request Again' menu item
    - expect: Creates duplicate request
    - expect: New document with same content type appears
    - expect: Different Document ID generated
  5. Click 'Delete Request' menu item
    - expect: Request is removed from document list
    - expect: Document count updates
    - expect: Request no longer appears in upload available requests

#### 3.3. Archived Documents View

**File:** `tests/document-management/archived-documents.spec.ts`

**Steps:**
  1. Verify Archived section shows '(0)' initially
    - expect: Archived section is collapsible
    - expect: Shows count of archived documents
    - expect: Can be expanded/collapsed
  2. Archive a document (if archiving functionality exists) and verify it appears in Archived section
    - expect: Document moves from main view to archived section
    - expect: Archived count updates
    - expect: Document maintains all metadata in archived state

### 4. Search and Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. Global Search Behavior

**File:** `tests/search-filter/global-search.spec.ts`

**Steps:**
  1. Create documents of various types (CV, Education, Financial)
    - expect: Multiple document categories visible on homepage
  2. Test main page search with exact content type name
    - expect: Search expands relevant category and shows detailed table
    - expect: Matching documents displayed
    - expect: Non-matching categories filtered out
  3. Test search with partial terms
    - expect: Partial matches return appropriate results
    - expect: Search appears case-insensitive
    - expect: Empty results show 'There are no records matching your request'
  4. Test search with special characters and numbers
    - expect: Search handles special characters gracefully
    - expect: Document IDs can be searched
    - expect: Search input validation prevents errors
  5. Clear search and verify reset functionality
    - expect: All documents return to view
    - expect: Category counts restore
    - expect: Table view collapses back to category summary

#### 4.2. Modal Search Functionality

**File:** `tests/search-filter/modal-search.spec.ts`

**Steps:**
  1. Test Request modal search with various category names
    - expect: Content type categories filter in real-time
    - expect: Search is partial match
    - expect: All categories return when search cleared
  2. Test Upload modal search functionality
    - expect: Same search behavior as Request modal
    - expect: Additional categories (Contracts, Pay Stubs, etc.) are searchable
    - expect: Available requests search box filters specific requests
  3. Test edge cases: empty search, very long search terms
    - expect: Empty search shows all categories
    - expect: Long search terms handled gracefully
    - expect: No JavaScript errors occur

### 5. User Experience and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Modal Interactions and Navigation

**File:** `tests/user-experience/modal-interactions.spec.ts`

**Steps:**
  1. Test modal opening/closing with various methods (button clicks, ESC key, outside clicks)
    - expect: Modals open smoothly
    - expect: Close button works
    - expect: ESC key closes modals
    - expect: Clicking outside modal closes it
    - expect: Focus management is proper
  2. Test navigation flow between different modal states
    - expect: Back buttons work correctly
    - expect: Breadcrumb navigation is logical
    - expect: User can navigate back to previous modal states
    - expect: Modal state is preserved appropriately
  3. Test form validation and error states
    - expect: Required fields are validated
    - expect: Error messages are clear and helpful
    - expect: Form submission blocked with invalid data
    - expect: Success states clearly communicated

#### 5.2. Responsive Design and Layout

**File:** `tests/user-experience/responsive-design.spec.ts`

**Steps:**
  1. Test application on different viewport sizes (mobile, tablet, desktop)
    - expect: All content remains accessible
    - expect: Modal dialogs scale appropriately
    - expect: Tables remain functional
    - expect: Touch targets are appropriately sized
  2. Test content type category grid layout
    - expect: Icons and text remain legible
    - expect: Grid layout adapts to screen size
    - expect: Touch interactions work on mobile
    - expect: Hover states work on desktop

### 6. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. Network Error Scenarios

**File:** `tests/error-handling/network-errors.spec.ts`

**Steps:**
  1. Test application behavior when API calls fail (simulate 500 errors observed)
    - expect: User receives meaningful error messages
    - expect: Application remains functional
    - expect: Retry mechanisms work where appropriate
    - expect: User can continue with other operations
  2. Test timeout scenarios for document requests and uploads
    - expect: Long-running operations show progress indicators
    - expect: Timeouts are handled gracefully
    - expect: User can retry failed operations

#### 6.2. Edge Case Data Scenarios

**File:** `tests/error-handling/edge-cases.spec.ts`

**Steps:**
  1. Test with maximum number of documents per category
    - expect: Performance remains acceptable
    - expect: Pagination or virtualization handles large lists
    - expect: Search/filter performance is maintained
  2. Test with special characters in document descriptions and search terms
    - expect: Special characters are handled properly
    - expect: XSS prevention is in place
    - expect: Unicode characters display correctly
  3. Test concurrent user actions (multiple rapid requests/uploads)
    - expect: Race conditions are prevented
    - expect: Document IDs remain unique
    - expect: State consistency is maintained

### 7. Integration and API Testing

**Seed:** `tests/seed.spec.ts`

#### 7.1. API Endpoint Validation

**File:** `tests/integration/api-endpoints.spec.ts`

**Steps:**
  1. Verify document search API calls with proper parameters
    - expect: API calls include correct delegate, delegateType, contentTypeNames
    - expect: Entity ID 003A000000pGqGo is properly passed
    - expect: Archived and non-archived queries work
    - expect: Size parameter limits results appropriately
  2. Test document creation API (POST to /v2/document)
    - expect: Document creation returns proper Document ID
    - expect: Audit trail is created
    - expect: Status is set to REQUESTED
  3. Test document retrieval API (/v2/document/{id})
    - expect: Individual document details can be fetched
    - expect: All metadata fields are present
    - expect: Status history is complete

#### 7.2. Authentication and Authorization

**File:** `tests/integration/auth-validation.spec.ts`

**Steps:**
  1. Verify Okta context API integration
    - expect: User context is properly established
    - expect: Entity permissions are validated
    - expect: Session management works correctly
  2. Test with different division contexts (CHS, CHG, CAP, etc.)
    - expect: Division-specific content types load
    - expect: Access permissions respect division boundaries
    - expect: URL parameters affect available options
  3. Test permission validation for document operations
    - expect: Users can only access their authorized entities
    - expect: Document visibility respects permissions
    - expect: Actions are authorized properly
