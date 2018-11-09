package com.objectedge;

import com.objectedge.middleware.MiddlewareApplication;
import com.objectedge.middleware.configuration.MiddlewareConfiguration;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 * Main Application.
 *
 * @author Mauricio Goncalves Neto <mauricio.neto@objectedge.com>
 * @version 1.0
 * @since 2015-08-10
 */
public class OEMiddlewareApplication extends MiddlewareApplication<MiddlewareConfiguration> {

  /**
   * The base entity package used to load hibernate entities
   */
  public static final String BASE_PACKAGE = "com.objectedge";

  /**
   * Starts application
   *
   * @param args the input arguments
   * @throws Exception the exception
   */
  public static void main(String[] args) throws Exception {
    new OEMiddlewareApplication().run(args);
  }

  /**
   * Application name
   *
   * @return the application name
   */
  @Override
  public String getName() {
    return "OEMiddleware";
  }

  /**
   * Initialize bundles
   *
   * @param bootstrap
   */
  @Override
  public void initialize(Bootstrap<MiddlewareConfiguration> bootstrap) {
    configureBasePackages(BASE_PACKAGE);
    super.initialize(bootstrap);
  }

  /**
   * Initialize application and configure resources
   *
   * @param configuration
   * @param environment
   */
  @Override
  public void run(MiddlewareConfiguration configuration, Environment environment) throws Exception {
    super.run(configuration, environment);
  }

}
