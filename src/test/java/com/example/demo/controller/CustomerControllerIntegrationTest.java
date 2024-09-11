package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.time.LocalDate;

@WebMvcTest(CustomerController.class)
public class CustomerControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateCustomer_Success() throws Exception {
        Customer customer = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
        when(customerService.saveCustomer(any(Customer.class))).thenReturn(customer);
        mockMvc.perform(post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Mohit"))
                .andExpect(jsonPath("$.lastName").value("Raheja"))
                .andExpect(jsonPath("$.dob").value("2002-01-02"));

        verify(customerService, times(1)).saveCustomer(any(Customer.class));
    }

    @Test
    public void testGetAllCustomers_Success() throws Exception {
        Customer customer1 = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
        Customer customer2 = new Customer(2L, "Ansh", "Raheja", LocalDate.of(2003,8,5));
        List<Customer> customers = Arrays.asList(customer1, customer2);
        when(customerService.getAllCustomers()).thenReturn(customers);

        mockMvc.perform(get("/api/customers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("Mohit"))
                .andExpect(jsonPath("$[1].firstName").value("Ansh"));

        verify(customerService, times(1)).getAllCustomers();
    }

    @Test
    public void testCreateCustomer_Error() throws Exception {

    Customer customer = new Customer(1L, "Mohit", "Raheja", LocalDate.of(2002,1,2));
    when(customerService.saveCustomer(any(Customer.class))).thenThrow(new RuntimeException("Database error"));

    mockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(customer)))
            .andExpect(status().isInternalServerError())
            .andExpect(content().string("Database error"));

    verify(customerService, times(1)).saveCustomer(any(Customer.class));
}

    @Test
    public void testGetAllCustomers_Empty() throws Exception {
        when(customerService.getAllCustomers()).thenReturn(Arrays.asList());


        mockMvc.perform(get("/api/customers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(customerService, times(1)).getAllCustomers();
    }
}
